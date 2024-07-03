const fsPromises = require("fs").promises;
const path = require("path");

// fs.readFile("./files/starter.txt", "utf-8", (err, data) => {
// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf-8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

const filesOps = async ()=>{
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n I am writing');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'fsPromisescompleted.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname,'files', 'fsPromisescompleted.txt'), 'utf8');
        console.log(newData); 
    }
    catch(err){
        console.log(err);
    }
}

filesOps();

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "This is me writing a file",
//   (err) => {
//     if (err) throw err;
//     console.log("Completed writing");

//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\nTesting append method",
//       (err) => {
//         if (err) throw err;
//         console.log("Append the file is completed");

//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "Newreply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("renaming the file is completed");
//           }
//         );
//       }
//     );
//   }
// );

process.on("uncaughtException", (err) => {
  console.error(`There was an err : ${err}`);
  process.exit(1);
});
