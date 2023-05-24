# BP
By Ondřej Rygl, 223327 


## Návod pro instalaci 
Stažený kód vyžaduje stažení Node.js a balíčkovacího systému NPM pro stažený potřebnývh knihoven na daný operační systém. 

### Instalace externích pro frontendovou část
 NPM je třeba nainstalovat do složky /xryglo00/frontend  
 Poté v ní spustit následnující příkazy, které nainstalují knihovny a sestaví řešení.

    npm install 
    npm run build

### Potřebné knihovny pro backednovou část
Nutná přítomnost pythonu, ideálně verze 3.10+

    pip install django
    pip install djangorestframework
    pip install requests

Pro spuštění aplikce stačí přejí do složky /xryglo00 a spustit pomocí příkazu: 

    python manage.py runserver
