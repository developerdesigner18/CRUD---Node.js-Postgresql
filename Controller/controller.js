const pool = require('../Config/db.config')

exports.findAllProducts = async (req, res) => {
  pool.query('SELECT * FROM public."Products"')
  .then((results)=>{
    res.status(200).json({ code: 200, products: results.rows});
  }).catch((error)=>{
    res.status(404).json({code:404,message:error.message})
  })
};

exports.create = async (req, res) => {
  const { orderDescription, productId} = req.body;   
  pool.query(
    `INSERT INTO public."Orders"( description, created)
    VALUES ('${orderDescription}','${new Date()}')`)
    .then((results)=>{
      pool.query('SELECT * FROM public."Orders"')
      .then((results)=>{
        let Order = results.rows.slice(results.rows.length - 1)[0];
        pool.query(`INSERT INTO public."OrderProductMap"(orderid, productid)
        VALUES ('${Order.id}',ARRAY[${productId}])`)
        .then((results)=>{
          res.status(200).json({ code: 200, message: "New Order Created Successfully" });
        }).catch((error)=>{
          res.status(404).json({code:404,message:error.message})
        })
      }).catch((error)=>{
        res.status(404).json({code:404,message:error.message})
      })
    }).catch((error)=>{
      res.status(404).json({code:404,message:error.message})
    })    
  }     

exports.findAllOrders = async (req, res) => {
  pool.query( `SELECT "OrderProductMap".productid,"Orders".*
  FROM "OrderProductMap" 
  JOIN "Orders" ON "Orders"."id" = "OrderProductMap"."orderid"`)
    .then((results)=>{    
      res.status(200).json({ code: 200, message:results.rows});
    }).catch((error)=>{
      res.status(404).json({code:404,message:error.message})
    })
};

exports.update = (req, res) => {
  const id = req.params.id;
  pool.query(
    `UPDATE public."Orders" SET description = '${req.body.description}' WHERE id = '${id}'`
  ).then((results)=>{
    pool.query(
      `UPDATE public."OrderProductMap" SET productid = ARRAY[${req.body.productId}] WHERE orderid = '${id}'`
    ).then((results)=>{
      res.status(200).json({code:200,message:"Order Updated Successfully"})
    }).catch((error)=>{
      res.status(404).json({code:404,message:error.message})
    })
  }).catch((error)=>{
    res.status(404).json({code:404,message:error.message})
  })
};

exports.delete = (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM public."OrderProductMap" WHERE orderid = ${id}`)
  .then((results)=>{
      pool.query(`DELETE FROM public."Orders" WHERE id = ${id}`)
      .then((results)=>{
        res.status(200).json({ code: 200, message: "Order Deleted Successfully" });
      }).catch((error)=>{
        res.status(404).json({code:404,message:error.message})
      })
  })
  .catch((error)=>{
    res.status(404).json({code:404,message:error.message})
  })
   
      
}
     

