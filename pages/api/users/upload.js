import formidable from "formidable";
import path from "path";
import fs from "fs";
import verifyToken from "../../../lib/verifyToken"

export const config = {
  api: {
    bodyParser: false,
  },
};

function getIPAddress(){
  var interfaces = require('os').networkInterfaces();
  for(var devName in interfaces){
      var iface = interfaces[devName];
      for(var i=0;i<iface.length;i++){
          var alias = iface[i];
          if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
              return alias.address;
          }
      }
  }
}

export default async (req, res) => {
  const {
    method,
    cookies
  } = req;
  const userId = cookies.userId;

  if(!cookies || !cookies.token || userId !== verifyToken(cookies.token)){
    return res.status(200).json({ message: "please sign in"});
  }

  switch (method) {
    case "POST":
      const form=new formidable.IncomingForm();
      const fileDir = path.join(process.cwd(), 'public/images/');
      form.uploadDir = fileDir;
      form.keepExtensions = true;

      form.parse(req, function(err, fields, files) {
        if(err){
          return res.status(200).json({ message: "fail to upload" });
        }
        if(!files[""]){
          return res.status(200).json({ message: "please upload a file" });
        }
      });

      form.on('file', (formName, file) => {
        const fileName = file.newFilename;
        const extName = path.extname(file.originalFilename);
        const oldPath = path.join(fileDir, fileName);
        const newPath = path.join(fileDir, userId + extName);
        fs.rename(oldPath, newPath,function(err){});

        res.status(200).json({ 
          message: "success",
          entity: {
            picUrl: `http://${getIPAddress()}:3000/images/${userId}${extName}` 
          }
        });
      });
      
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
};
