
exports.getsaleById = (req, res, next, id) => {
   try {
      Sale.aggregate([
         {
            $lookup: {
               from: "customers",
               localField: "customerId",
               foreignField: "_id",
               as: "customerDetails",
            },
         },
         {
            $lookup: {
               from: "payments",
               localField: "paymentId",
               foreignField: "_id",
               as: "paymentDetails",
            },
         },
         {
            $match: {
               _id: mongoose.Types.ObjectId(id),
            },
         },
      ]).exec((err, sale) => {
         // console.log("SAle DAtA", sale);
         if (err) {
            return res.status(400).json({
               error: "sale data not found",
            });
         }
         req.sale = sale;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

const PostSchema = new Schema(
   {
     title: String,
     media: [],
     type: String,
     visibleTo: { type: String, default: 'anyone' },
     author: { type: Schema.Types.ObjectId, ref: 'Users' },
     authorCompany: { type: Schema.Types.ObjectId, ref: 'Companies' },
     isShared: { type: Boolean, default: false },
     sharedById: { type: Schema.Types.ObjectId, ref: 'Users' },
     sharedId: { type: Schema.Types.ObjectId, ref: 'Posts' },
     companyId: { type: Schema.Types.ObjectId, ref: 'Companies' }, // companyId for recommand
     temporaryCompanyId: {
       type: Schema.Types.ObjectId,
       ref: 'TemporaryCompany',
     },
     likes: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
     comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
     tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
     industries: [{ type: Schema.Types.ObjectId, ref: 'Industries' }],
     userMentions: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
     companyMentions: [{ type: Schema.Types.ObjectId, ref: 'Companies' }],
     isDeleted: { type: Boolean, default: false },
   },
   { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
 )
 
 export const Posts = Mongoose.model('Posts', PostSchema)