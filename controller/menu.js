import Menu from "../model/menu.js";

const getMenu = async (req, res) => {
    const menu = await Menu.find();
    
    res.status(200).json({ menu });
}

const addMenu = async (req, res) => {
    const { menuname, duration, price, description } = req.body;
    
    try {
        const menu = new Menu({
            menuname,
            duration,
            price,
            description
        });

        await menu.save();

        return res.status(200).json({ menu });

    } catch(error) {
        return res.status(500).json({
            message: 'aaaServer Error'
        })
    }
}

const updateMenu = async (req, res) => {
    const { id, menuname, duration, price, description } = req.body;
    
    try {
        const menu = await Menu.findByIdAndUpdate(id, {
            menuname,
            duration,
            price,
            description
        }, { new: true });

        return res.status(200).json({ menu });
        
    } catch(error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}

const deleteMenu = async (req, res) => {
    const { id } = req.body; //POST request

    console.log(id);

    try {
        await Menu.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'this menu is deleted'
        })
    } catch(error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export {
    getMenu,
    addMenu,
    updateMenu,
    deleteMenu
}