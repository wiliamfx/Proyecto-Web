// BASE DE DATOS TABLA DE USUARIOS, CORREO ELECTRONICOS
const users_email = ["jeffersonzambranoch_01@outlook.com", "at60805652@idat.pe"];

const express = require('express');
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use('/', express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Configuración de transporte de Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.TRANSPORTER_USER,
        pass: process.env.TRANSPORTER_PASSWORD
    }
});

transporter.verify().then(() => console.log("Listo para enviar correo"));

// Ruta para enviar correos
app.post('/', async (req, res) => {
    const { subject, message } = req.body;

    // Verifica si el correo existe en la lista
    if (users_email.includes(subject)) {
        try {
            const content = `
                <h2>${message}</h2>
            `;
            await transporter.sendMail({
                from: '"Sabor Latino" <jeffersonzambrano777@gmail.com>',
                to: subject,
                subject: "Te enviamos un código de seguridad",
                html: "El código de seguridad es: 121314"
            });

            res.send({ success: true, message: "Mensaje enviado" });
        } catch (error) {
            console.error('Error al enviar correo:', error);
            res.status(500).send({ success: false, message: "Error al enviar el correo" });
        }
    } else {
        res.status(404).send({ success: false, message: "Su correo no existe" });
    }
});

// Iniciar el servidor
app.listen(3002, () => console.log("Escuchando desde http://localhost:3002"));
