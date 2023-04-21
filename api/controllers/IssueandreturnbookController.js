/**
 * IssueandreturnbookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
<<<<<<< HEAD
    // book issued and return history
=======

>>>>>>> library
    bookHistory:async(req,res)=>{
        const bookHistory=await Issueandreturnbook.find({}).populate('book');
        if(bookHistory){
            return  res.status(200).json({message:' book history',bookHistory})
        }else{
            return  res.status(200).json({message:'not found'})
        }
    },
<<<<<<< HEAD
    //issued book history and book was not returned at.
=======
>>>>>>> library
    issuedbookHistory:async(req,res)=>{
        const book=req.params.book;
        console.log("book",book)
        const issuedbookHistory=await Issueandreturnbook.find({book:book,isIssued:true,isReturned:false}).populate('book');
        console.log(issuedbookHistory)
        if(issuedbookHistory){
            return  res.status(200).json({message:'issued book history',issuedbookHistory})
        }else{
            return  res.status(200).json({message:'not found'})
        }
    },

<<<<<<< HEAD
//issuing book
=======

>>>>>>> library
    issuedBook:async(req,res)=>{
        const {book,issuedBookBy}=req.body
        const user=await User.findOne({id:issuedBookBy});
        if(!user){
            return  res.status(200).json({message:'invalid user id'})
        }else{
            const books=await Book.findOne({id:book,isAvailable:true,isDelete:false});
            if(!books){
                return  res.status(200).json({message:'book was already issued'})
            }else{
                const issuedBooks=await Issueandreturnbook.create({book:book,issuedBookBy:issuedBookBy,isIssued:true}).fetch();
                if(issuedBooks){
                    const bookavailable=await Book.updateOne({id:book}).set({isAvailable:false});
                    console.log(bookavailable);
                    return res.status(200).json({message:'book was issued',issuedBooks})
                }else{
                    return res.status(200).json({message:'db error'})
    
                }
            }
        }

    },
<<<<<<< HEAD
  //return book
=======

>>>>>>> library
    returnedBook:async(req,res)=>{
        const {book,returnBookBy}=req.body;
        const user=await User.findOne({id:returnBookBy});
        if(!user){
            return  res.status(200).json({message:'invalid user id'})
        }else{
            const issuedtrue=await Issueandreturnbook.findOne({book:book,issuedBookBy:returnBookBy,isIssued:true,isReturned:false});
            if(!issuedtrue){
               return res.status(200).json({message:'please issue the book'})
            }
            else{
                const returnBooks= await Issueandreturnbook.updateOne({book:book,issuedBookBy:returnBookBy,isIssued:true,isReturned:false}).set({returnBookBy:returnBookBy,isReturned:true,isReturnedAt:new Date()});
                if(returnBooks){
                    const bookavailable=await Book.updateOne({id:book}).set({isAvailable:true});
                    console.log(bookavailable);
                    return res.status(200).json({message:'book was returned',returnBooks})
              }else{
                  return res.status(200).json({message:'db error'})
              }
    
            }
        }
        }

    
  

};

