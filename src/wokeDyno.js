const fetch = require("node-fetch");

const wakeUpDyno = (url, interval = 28, callback) => {
    let milliseconds = interval * 60000;
    
    setTimeout(() => {

        try { 
            console.log(`Acordando Dyno!`);
            
            fetch(url).then(() => console.log(`Buscando ${url}.`)); 
        }
        catch (err) { 
            console.log(`Erro na busca ${url}: ${err.message} 
            Tentando novamente em ${interval} minutos...`);
        }
        finally {

            try {
                callback(); // execute callback, if passed
            }
            catch (e) { // catch callback error
                callback ? console.log("Chamada falhou: ", e.message) : null;
            }
            finally {
                // do it all again
                const hours = new Date().getHours();
                interval = (hours > '08' && hours < '23' || hours == '00') ? 28 : 480;
                return wakeUpDyno(url, interval, callback);
            }
            
        }

    }, milliseconds);
};

module.exports = wakeUpDyno;