/**
 * BookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    //list of all books
    book:async(req,res)=>{
        const { page, limit, search } = req.query;
        const skip = (page - 1) * limit;
        const pagelimit = parseInt(limit); 
        let whereClause = { isDelete: false };
        let query = {};
        if (limit) {
          query.skip = skip;
          query.limit = pagelimit;
        }
        if (search) {
          const searchcharacter = search.replace(/[^A-Za-z ]/gm, "");
          whereClause.bookname = { contains: searchcharacter };
        }
        query.where = whereClause;
        let book = await Book.find(query).meta({ makeLikeModifierCaseInsensitive: true }).populateAll();
        return res.status(200).json({
          page,
          book
        });

    },

   // add book

    addBook:async(req,res)=>{
        const {bookname,price,publicationYear,category,author}=req.body;
        const categoryValidation=await Category.findOne({id:category,isDelete:false});
        if(!categoryValidation){
            res.status(200).json({message:'invalid Category id'})
        }
       else{
        const authorValidation=await Author.findOne({id:author,isDelete:false})
           if(!authorValidation){
            res.status(200).json({message:'invalid author id'})
           }
           else{
            const book=await Book.find({bookname:bookname,price:price,publicationYear:publicationYear,category:category,author:author,isDelete:false});
            if(book.length != 0){
                res.status(200).json({message:'Book was already exits'})

            }else{
                 const addBook=await Book.create({bookname:bookname,price:price,publicationYear:publicationYear,category:category,author:author}).fetch()
                    if(addBook){
                        return res.status(200).json({message:'success', addBook:addBook})
                    }else{
                    return res.status(404).json({message:'book was not added'})
                    }
            }
           }
       }
    },

   // get book by id
    editBook:async(req,res)=>{
        const id=req.params.id;
        const book=await Book.findOne({id:id,isDelete:false}).populateAll();
        if(book){
            return res.status(200).json({message:'success', book:book})
        }else{
            return res.status(404).json({message:'book was not found'})
        }

    },
  //update book by id

    updateBook:async(req,res)=>{
        const id=req.params.id;
        const {bookname,price,publicationYear,category,author}=req.body;
        const categoryValidation=await Category.findOne({id:category,isDelete:false});
        if(!categoryValidation){
            res.status(200).json({message:'invalid Category id'})
        }
       else{
        const authorValidation=await Author.findOne({id:author,isDelete:false})
           if(!authorValidation){
            res.status(200).json({message:'invalid author id'})
           }
           else{
        
                await Book.updateOne(id,{bookname:bookname,price:price,publicationYear:publicationYear,category:category,author:author,updatedAt:new Date()})
                .then((book)=>{
                    if(book){
                        return  res.status(200).json({message:'success',book})
                    }else{
                        return res.status(404).json({message:'failed to update'})
                      }
                  })
            
           }
       }
        
    },

    // delete book by id

    deleteBook:async(req,res)=>{
        const id=req.params.id;
        const book=await Book.findOne({id:id,isDelete:false,isAvailable:true});
        if(!book){
            return res.status(404).json({message:'failed to delete beacuse book was issued to user'})
        }else{
            await Book.updateOne(id,{isDelete:true,deletedAt:new Date()})
            .then((book)=>{
                if(book){
                    return  res.status(200).json({message:'success'})
                }else{
                    return res.status(404).json({message:'failed to delete'})
                  }
              })
        }
    },



};

