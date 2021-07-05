export class AppConst {
    public static trimPattern = /^\s+|\s+$/gm; // pattern for trimming
    public static pageSize = 5;
    public static pageSizeOptions: number[] = [1, 2, 5, 10, 25, 100];

    public static emailValidationPattern = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*(\+[a-zA-Z0-9-]+)?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;  // email validation pattern
    public static mobileValidationPatter = /^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}98(\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$/;
    public static pngiconx = 19;
    public static pngicony = 35;
    public static stageWidth = 700;
    public static stageHeight = 600;
    public static technologydeleteMessage = 'Are you sure you want to delete technology ?';
    public static projectdeleteMessage = 'Are you sure you want to delete project ?';
    public static departmentDeleteMessage = 'Are you sure you want to delete department ?';
    public static emoployeeDeleteMessage = 'Are you sure you want to delete Employee ?';
    public static bugdetailsDeleteMessage = 'Are you sure you want to delete Bug Detail ?';
    public static logoutMessage = 'You have successfully Logged Out'

    public static genderArray = [
        {
            value: "Male",
            id: 1
        },
        {
            value: "Female",
            id: 2
        },
        {
            value: "Others",
            id: 3
        }
    ];

    public static labelForTextbox = {
        "Default": "Search Value",
        "Department": "Please Enter Department Name",
        "Technology": "Please Enter Technology Name",
        "Project": "Please Enter Project Name or Project Description",
        "Bug": "Please Enter Bug Title or Bug Description"
    }
}
