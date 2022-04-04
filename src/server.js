const express = require('express');
const ejs = require('ejs')
const path = require('path')
const app = express();
const pdf = require ('html-pdf');
const { header } = require('express/lib/request');
const passengers = [
    {
         name: "Joyce",
         flightNumber: 7859,
         time: "18h00",
     },
     {
         name: "Brock",
         flightNumber: 7859,
         time: "18h00",
     },
     {
         name:"Eve",
         flightNumber:7859,
         time: "18h00",
     },
     ]
     //requisição e resposta para o servidor
     app.get('/',  (request, response) => {
        const filePath = path.join(__dirname, 'print.ejs')
        ejs.renderFile(filePath, {passengers}, (err, data)  => {
            if(err){
                return response.send('Erro na leitura do arquivo')
            }

            //configurando folha para pdf
            const options = {
                height: '11.25in',
                width: '8.5in', 
                header: {
                    height: '20mm'
                },
                footer: {
                    height: '20mm'
                }
            }
            //criar pdf
            pdf.create(data, options).toFile('report.pdf', (err, data) =>{
                if(err){
                    return response.send('Erro ao Gerar o PDF');
                }
                 // enviar para o navegador
            return response.send('Arquivo gerado com sucesso');
            })
           
        });
        
     });
     app.listen(3000);
      