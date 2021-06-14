try {
    let userData = await Users.findOne({
      _id: mongoose.Types.ObjectId(req.userData.userId),
    }).select('intrestedTags interestedIndustries followings followingsCompanies')
    // console.log(" ========== userData : ", userData);
    // let mongoQuery = {};

    let mongoQuery = {
      $and: [
        { isDeleted: false }, {
          $or: [{
            visibleTo: 'anyone'
          }, {
            $and: [
              { visibleTo: 'mynetwork' },
              {
                $or: [{ author: { $in: userData.followings } },
                { authorCompany: { $in: userData.followingsCompanies } }]
              }
            ]
          }]
        }
      ]
    }

    if (!req.query.showAuther) {
      mongoQuery['$and'].push({ author: { $ne: req.userData.userId } })
    }


    let skip = parseInt(req.query.skip) || 0
    let limit = parseInt(req.query.limit) || 0

    if (req.query.filters || req.query.sortBy === 'recommended') {
      // mongoQuery['$and'] = []
      if (req.query.sortBy === 'recommended') {
        mongoQuery['$and'].push({
          $or: [
            { tags: {$in: userData.intrestedTags} },
            { industries: {$in: userData.interestedIndustries} },
          ],
        })
      }
      if (req.query.companyId) {
        mongoQuery['$and'].push(
          { companyId: { $in: [req.query.companyId] } },
          { authorCompany: { $in: [req.query.companyId] } }
        )
      }

      if (req.query.tags) {
        mongoQuery['$and'].push({ tags: { $in: req.query.tags } })
      }

      if (req.query.person) {
        mongoQuery['$and'].push(
          { author: { $in: [req.query.person] } },
          { sharedById: { $in: [req.query.person] } }
        )
      }

      if (req.query.author) {
        mongoQuery['$and'].push({
          $or: [
            { author: { $in: [req.query.author] } },
            { authorCompany: { $in: [req.query.author] } },
          ],
        })
      }

      if (req.query.date) {
        mongoQuery['$and'].push({
          created_at: {
            $gte: JSON.parse(req.query.date[0]),
            $lte: JSON.parse(req.query.date[1]),
          },
        })
      }
    } else {
      if (req.query.companyId) {
        mongoQuery['$or'] = [
          { companyId: { $in: [req.query.companyId] } },
          { authorCompany: { $in: [req.query.companyId] } },
        ]
      }

      if (req.query.tags) {
        mongoQuery['$or'] = [{ tags: { $in: req.query.tags } }]
      }

      if (req.query.person) {
        mongoQuery['$or'] = [
          { author: { $in: [req.query.person] } },
          { sharedById: { $in: [req.query.person] } },
        ]
      }

      if (req.query.author) {
        mongoQuery['$or'] = [
          { author: { $in: [req.query.author] } },
          { authorCompany: { $in: [req.query.author] } },
        ]
      }

      if (req.query.date) {
        mongoQuery = {
          created_at: {
            $gte: new Date(req.query.date[0]),
            $lte: new Date(req.query.date[1]),
          },
        }
      }
    }

    const postData = await Posts.find(mongoQuery)
      .sort({ created_at: -1 })
      .populate('tags')
      .populate('companyId')
      .populate('sharedById')
      .populate('likes', '_id firstName lastName profileImage')
      .populate('temporaryCompanyId', 'companyName emailAddress _id')
      .populate('authorCompany', 'companyName slug logo _id')
      .populate({
        path: 'author',
        select:
          'firstName lastName occupation profileImage slug workingAt workingAtTempCompanyId',
        populate: [
          {
            path: 'companyId',
            select: 'companyName',
          },
        ],
        model: 'Users',
      })
      .populate({
        path: 'author',
        populate: {
          path: 'workingAt',
          select: 'companyName slug logo _id',
          model: 'Companies',
        },
        model: 'Users',
      })
      .populate({
        path: 'author',
        populate: {
          path: 'workingAtTempCompanyId',
          select: 'companyName _id',
          model: 'TemporaryCompany',
        },
        model: 'Users',
      })
      .populate({
        path: 'sharedById',
        populate: [
          {
            path: 'companyId',
            select: 'companyName logo slug _id',
            model: 'Companies',
          },
        ],
      })
      .populate({
        path: 'sharedById',
        populate: {
          path: 'workingAt',
          select: 'companyName slug logo _id',
          model: 'Companies',
        },
        model: 'Users',
      })
      .populate({
        path: 'sharedById',
        populate: {
          path: 'workingAtTempCompanyId',
          select: 'companyName _id',
          model: 'TemporaryCompany',
        },
        model: 'Users',
      })
      .populate({
        path: 'comments',
        populate: [
          {
            path: 'postedBy',
            model: 'Users',
            populate: [
              {
                path: 'workingAt',
                select: 'companyName slug logo _id',
                model: 'Companies',
              },
              {
                path: 'workingAtTempCompanyId',
                select: 'companyName _id',
                model: 'TemporaryCompany',
              },
            ],
          },
          {
            path: 'companyMentions',
            select: 'companyName slug',
            model: 'Companies',
          },
          {
            path: 'userMentions',
            select: 'firstName lastName slug',
            model: 'Users',
          },
          {
            path: 'replies.postedBy',
            where: { 'replies.postedBy': { $exists: true, $ne: null } },
          },
          {
            path: 'replies.companyMentions',
            select: 'companyName slug',
            model: 'Companies',
          },
          {
            path: 'replies.userMentions',
            select: 'firstName lastName slug',
            model: 'Users',
          },
        ],
        options: { sort: { created_at: -1 } },
        model: 'Comments',
      })
      .populate({
        path: 'sharedId',
        populate: [
          {
            path: 'author',
            select: 'firstName lastName occupation profileImage slug',
            populate: [
              { path: 'companyId', select: 'companyName' },
              {
                path: 'workingAt',
                select: 'companyName slug logo _id',
                model: 'Companies',
              },
              {
                path: 'workingAtTempCompanyId',
                select: 'companyName _id',
                model: 'TemporaryCompany',
              },
            ],
            model: 'Users',
          },
          {
            path: 'companyId',
            select: 'companyName slug _id',
            model: 'Companies',
          },
          {
            path: 'temporaryCompanyId',
            select: 'companyName emailAddress _id',
            model: 'TemporaryCompany',
          },
          {
            path: 'tags',
            select: 'label value _id',
            model: 'Tags',
          },
          {
            path: 'likes',
            select: 'firstName lastName occupation _id slug',
            model: 'Users',
          },
        ],
        model: 'Posts',
      })
      .populate({
        path: 'userMentions',
        select: 'firstName lastName slug',
        model: 'Users',
      })
      .populate({
        path: 'companyMentions',
        select: 'companyName slug',
        model: 'Companies',
      })
      .skip(skip)

      .limit(limit)
    res.send(responseHandler(postData, postData.length))
  } catch (error) {
    next(error)
  }