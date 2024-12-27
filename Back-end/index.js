const port = 9090;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");


app.use(express.json());
app.use(cors());

//DB connection
mongoose.connect("mongodb+srv://didftorres:Admind1006@cluster0.8omggvo.mongodb.net/quickchangecol");

//API
app.get("/", (req, res) => {
    res.send("Funcionando en express en modo dev");

});
//Storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

//CRUD
//upload img

app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });

});

//object product
const productSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    avilable: {
        type: Boolean,
        default: true
    }

});

const ProductMd = mongoose.model('Product', productSchema);

app.post('/addproduct', async (req, res) => {
    let products = await ProductMd.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new ProductMd({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,

    });
    console.log(product);
    await product.save();
    console.log("Producto guardado.!");
    res.json({
        success: true,
        name: req.body.name,
    });

})
//delete
app.post('/deleteproduct', async (req, res) => {
    await ProductMd.findOneAndDelete({ id: req.body.id });
    console.log("Producto eliminado.!");
    res.json({ success: true, name: req.body.name });

});
//Get all product
app.get('/allproducts', async (req, res) => {
    let products = await ProductMd.find({});
    console.log("Todos los productos obtenidos.!");
    res.send(products);
})
//Edit
app.get(`/editproduct/:id`, async (req, res) => {
   
    const idProduct = req.params.id;
  
   
})

//object of user
const usersSchema = mongoose.Schema({

    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,

    },
    date: {
        type: Date,
        default: Date.now(),
    },
});
const UsersMd = mongoose.model('Users', usersSchema);
//singup
app.post('/singup', async (req, res) => {
    let check = await UsersMd.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: 'ya existe un usuario con este email' });
    }
    let cart = {};

    for (let i = 0; i < 200; i++) {
        cart[i] = 0;
    }

    const user = new UsersMd({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,

    });
    console.log(user);
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');

    res.json({
        success: true,
        token
    });
    console.log("usuario guardado.!");
})
//login
app.post('/login', async (req, res) => {
    let user = await UsersMd.findOne({ email: req.body.email });
    if (user) {
        const equalsPass = req.body.password === user.password;
        if (equalsPass) {
            const data = {
                user: { id: user.id }
            }
            const token = jwt.sign(data, 'secret_ecom');

            res.json({
                success: true,
                token
            });
            console.log("inicio sesion.!");
        } else {
            res.json({
                success: false,
                error: "Error de password"
            });
        }
    } else {
        res.json({
            success: false,
            error: "Error de email"
        });

    }
})
//new collection
app.get('/newcollection', async (req, res) => {
    let products = await ProductMd.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("Datos encontrados");
    res.send(newcollection);
})

//popular
app.get('/popular', async (req, res) => {
    let products = await ProductMd.find({ category: 'women' });
    let popular = products.slice(0, 4);
    console.log("Datos encontrados");
    res.send(popular);
})

//fetchUser
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Primero ingresa con tú usuario" })
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Primero ingresa con tú usuario" });
        }
    }
}

//addTocart
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Agregado", req.body, req.user);

    let userData = await UsersMd.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await UsersMd.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Producto Agregado");
});

//remove item from cart
app.post('/removeitemcart', fetchUser, async (req, res) => {
    console.log("eliminado", req.body.itemId);
    let userData = await UsersMd.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await UsersMd.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send({ success: true, name: req.body.itemId });
});


//get cart
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await UsersMd.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Funcionando en el puerto :" + port);

    } else {
        console.log("Error : " + error);
    }

});

