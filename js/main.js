// Info zur dom.js = Classennamen als Array übergeben: ['container']
'use strict';
const elements = {};
let websides = {};
let selected = false;
let domaindetails;
let reloadCnt = 0;
let wHeigth;
let wWidth;
let manyContainerToView;
let mybutton;

const createNewEntry = domainnames => {
    // Detail view -> Modal Window erstellen:
    // Daten werden nur in dem localstorage gespeichert.
    let data;
    let newData = [];
    let bodomOnline;

    // Entry-Tag löschen, um doppelte Einträge zu vermeiden:
    if (document.querySelector('entry')) {
        document.querySelector('entry').remove();
    }

    const modalsection = document.querySelector('content')
    const createEntry = dom.createEl(false, 'entry', modalsection);
    const modalEntry = document.querySelector('entry')
    const dommainsection = dom.createEl(false, 'div', modalEntry, ['newEntries']);

    // Daten für websides/domainname + websides/domaindetails(1)-(JSON)
    const domsection = dom.createEl(false, 'form', dommainsection);
    const inputDomName = dom.createEl(`Domainname: <input type='text' name='domName' id='domName' class='inputfields'>`, 'p', domsection, ['inputsection']);
    // Daten für websides/testresults (JSON)
    const inputDomIP = dom.createEl(`Domain IP v4: <input type='text' name='domip' id='domip' class='inputfields'>`, 'p', domsection, ['inputsection']);
    const inputDomOnline = dom.createEl(`Domain online: <input type='text' name='domonline' id='domonline' class='inputfields' vaule=1>`, 'p', domsection, ['inputsection']);

    // websides/domaindetails(2-4)-(JSON)
    const inputDomAdmin = dom.createEl(`Domain Admin: <input name='inputAdmin' type='text' name='domadmin' id='domadmin' class='inputfields'>`, 'p', domsection, ['inputsection']);
    const inputDomAdminEmail = dom.createEl(`Domain Admin-Email: <input type='text' name='domadminemail' id='domadminemail' class='inputfields'>`, 'p', domsection, ['inputsection']);
    const inputDomLocation = dom.createEl(`Domain Location: <input type='text' name='domlocation' id='domlocation' class='inputfields'>`, 'p', domsection, ['inputsection']);

    // Speichern der Eingabe (erste Versuch "ohne Überprüfung")
    const saveNewEntry = dom.createEl(false, 'div', dommainsection);
    const btnSaveNewInsert = dom.createEl('Speichern', 'button', dommainsection, ['saveNewEntry', 'button']);

    btnSaveNewInsert.addEventListener('click', evt => {
        evt.stopPropagation();
        const txtdomName = document.getElementById('domName').value;
        const txtdomIP = document.getElementById('domip').value;
        let txtdomOnline = document.getElementById('domonline').value;
        const txtdomAdmin = document.getElementById('domadmin').value;
        const txtdomAdminEmail = document.getElementById('domadminemail').value;
        const txtdomLocation = document.getElementById('domlocation').value;

        // Setze online auf true oder false wenn der Benutzer Eingaben getätigt hat (ohne Prüfung):
        txtdomOnline = txtdomOnline.toLowerCase();
        if (txtdomOnline === "true") {
            bodomOnline = true;
        } else if (txtdomOnline === "false") {
            bodomOnline = false;
        } else {
            bodomOnline = '"N/A"';
        }
        /*
                console.log('domainnames before push: ' + domainnames);
                newData = localStorage.getItem('domainNames');
                const dataAppend = JSON.stringify({domainname: txtdomName, testresults: [{ ipv4: txtdomIP, pingresult: bodomOnline }],
                    domaindetails: [{ domainname: txtdomName, domainadmin: txtdomAdmin, domainadminemail: txtdomAdminEmail, domainlocation: txtdomLocation }]
                });
                let tst = localStorage.getItem('domainNames').lastIndexOf(']')
                console.log(tst);
                console.log('Inhalt dataAppend before push: ' + dataAppend);
                // domainnames.push(dataAppend);
        */

        const dataAppend = ',{"domainname": ' + '"' + txtdomName + '"' + ',"testresults": [{"ipv4":' + '"' + txtdomIP + '"' + ',"pingresult":' + bodomOnline + '}], "domaindetails": [{"domainname":' + '"' + txtdomName + '"' + ',"domainadmin":' + '"' + txtdomAdmin + '"' + ',"domainadminemail":' + '"' + txtdomAdminEmail + '"' + ',"domainlocation":' + '"' + txtdomLocation + '"' + '}]}]';

        data = localStorage.getItem('domainNames');
        let lenData = data.length;
        data = data.substring(0, data.lastIndexOf(']'));
        data = data + dataAppend;

        localStorage.setItem('domainNames', '');
        localStorage.setItem('domainNames', data);

        location.reload();
        $('.modalOverlay, .modalContent').removeClass('active');
    });

    // Wenn der Benutzer auf Abbrechen klickt, wird das Modal Window geschlossen:
    const saveAbbrechen = dom.createEl(false, false, saveNewEntry);
    const btnSaveAbbrechen = dom.createEl('Abbrechen', 'button', dommainsection, ['saveAbbrechenNewEntry', 'button']);

    btnSaveAbbrechen.addEventListener('click', evt => {
        evt.stopPropagation();
        $('.modalOverlay, .modalContent').removeClass('active');
    })

    // Sichtbarkeit des Modal-Window switchen:    
    $('.modalOverlay, .modalContent').addClass('active');
}

const viewDomainDetails = domaindetails => {
    // Detail view -> Modal Window erstellen:
    // Entry-Tag löschen, um doppelte Einträge zu vermeiden:
    if (document.querySelector('entry')) {
        document.querySelector('entry').remove();
    }

    // Modal Window Inhalt neu zusammen stellen:
    // Konstrukt aufbauen:
    const modalcontent = document.querySelector('content')
    const createEntry = dom.createEl(false, 'entry', modalcontent);
    const modalEntry = document.querySelector('entry');
    const domcontent = dom.createEl(false, 'div', modalEntry);

    // Konstrukt mit inhalt füllen:
    const domName = dom.createEl(`Domain Location (externer Link !): <a href='https://iplocation.io/ip/${domaindetails[0].domainname}' class='btnExtOpen' target='blank'># ${domaindetails[0].domainname}</a>`, 'p', domcontent);
    const domAdmin = dom.createEl('Domain Admin.: ' + domaindetails[0].domainadmin, 'p', domcontent);
    const domAdminEmail = dom.createEl('Domain Admin. Email: ' + domaindetails[0].domainadminemail, 'p', domcontent);
    const domLocation = dom.createEl('Domain Location: ' + domaindetails[0].domainlocation, 'p', domcontent);

    // iFrame mit einer classe erstellt, um es evtl. besser plazieren zu können.
    const domiFrame = dom.createEl(`<iframe src=https://www.whois.com/whois/${domaindetails[0].domainname}' width='100%' heigth='300px'></iframe`, 'p', domcontent, ['myiFrame']);

    // Sichtbarkeit des Modal-Window switchen:    
    $('.modalOverlay, .modalContent').addClass('active');

    $('.modalOverlay').click(function () {
        $('.modalOverlay, .modalContent').removeClass('active');
    })
}

const delAllContainers = () => {
    // Lösche alle container aus der vorhanden Seite:
    const allContainers = document.getElementsByClassName('container');
    allContainers.remove();
}

const deleAllOfflines = domainnames => {
    // Löscht alle offline Domain Einträge im Array und setzt den localstorage neu:
    const allContainers = document.getElementsByClassName('container');
    for (let i = 0; i < domainnames.length; i++) {

        let offDomain = domainnames[i];
        let testresults = Array.from(offDomain.testresults);

        if (!testresults[0].pingresult) {
            console.log('Enthält: ' + testresults[0].pingresult);
            domainnames.splice(i, 1);
            i--
        }
    }

    localStorage.setItem('domainNames', '');
    localStorage.setItem('domainNames', JSON.stringify(domainnames));

    delAllContainers;
    location.reload();
}

const renderContent = domainnames => {
    // Rendern der JSON-/Localstorage-Daten
    // Main Funktion:
    let testresults;
    let pingresultat;
    let pingresultatClass;

    // Buttonleiste erstellen über der Ausgabe:
    const buttonContainer = dom.createEl(false, 'div', elements.main, ['buttonleiste']);

    // Definition der einzelnen Buttons:
    // Button alle offline Domains ausbleden:
    const delAllbuttonOffline = dom.createEl(false, 'div', buttonContainer);
    const btnAllDelete = dom.createEl('Offline Einträge entfernen', 'button', delAllbuttonOffline, ['delAllBtn', 'button']);
    btnAllDelete.addEventListener('click', () => deleAllOfflines(domainnames));

    // Button um den localstorage zu löschen und so das Programm wieder zu veranlassen die JSON Datei zu laden:
    const delLocalstorage = dom.createEl(false, 'div', buttonContainer);
    const btnDelStore = dom.createEl('JSON-Datei neu laden ', 'button', delLocalstorage, ['delLocStoreageBtn', 'button']);
    btnDelStore.addEventListener('click', () => {
        localStorage.clear();
        JSONSuccessLoad;
        location.reload();
    });

    const newLoad = dom.createEl(false, 'div', buttonContainer);
    const btnLocalReload = dom.createEl('Lokal neu laden', 'button', newLoad, ['newLoad', 'button']);
    btnLocalReload.addEventListener('click', () => {
        location.reload();
    });

    // Neuer Eintrag hinzufügen. wird im localstorage gespeichert:
    const newEntry = dom.createEl(false, 'div', buttonContainer);
    const btnNewInsert = dom.createEl('Neu Hinzufügen', 'button', newEntry, ['newEntry', 'button']);
    btnNewInsert.addEventListener('click', () => {
        createNewEntry(domainnames);
    })

    // Main Page,  container für jede Domain anlegen und mit Inhalt füllen:
    let domCounter = 1;
    let domNamesCnt = 1;

    if (domainnames.length > 0) {

        // Haupteintrag: Domainname erzeugen:
        for (let content of domainnames) {

            const container = dom.createEl(false, 'div', elements.main, ['container']);
            const domainEl = dom.createEl(`Nähere details zu : <br> <a href='#' class='btnOpen'>${content.domainname}</a>`, 'div', container, ['domainname', 'domCounter' + domCounter]);
            domainEl.addEventListener('click', () => {
                viewDomainDetails(content.domaindetails);
            })

            // Daten für die Untereinträge, zu den Domainname holen:
            testresults = Array.from(content.testresults);

            // Untereinträge zu den einzelnen Domainen erzeugen:
            for (let testresult of testresults) {
                const ipv4El = dom.createEl(`Ping Ergebnis : <br>` + testresult.ipv4, 'div', container, ['ipv4']);

                // console.log('Resultat des Online-Status: ' + testresult.pingresult);
                if ((testresult.pingresult) & (testresult.pingresult != 'N/A')) {
                    pingresultat = 'Online: ' + testresult.pingresult;
                    pingresultatClass = "pingresulttrue";
                } else {
                    pingresultat = 'Online:  false';
                    pingresultatClass = "pingresultfalse";
                }

                const pingresultEl = dom.createEl(pingresultat, 'p', ipv4El, [pingresultatClass]);

                // Button zum löschen für jeden einzelnen Eintrag erstellen und EventListener dazu:
                const buttonPTag = dom.createEl(false, 'div', container)
                let btnDelete = dom.createEl('Eintrag löschen', 'button', buttonPTag, ['delBtn']);
                btnDelete.addEventListener('click', () => {

                    // Eintrag aus dem Array entfernen:
                    // console.log(content);
                    domainnames.splice(content, 1);

                    // Den Container Tag aus der Seite entfernen, damit der Eintrag auch auf der Webseite verschwindet
                    // und neu gerendert werden kann:
                    container.remove();

                    console.log(domainnames.length);
                    console.log(domNamesCnt);

                    // Daten in localstorage ablegen, um beim neu laden der Seite auf die aktuellen Daten zugreifen zu können:
                    localStorage.setItem('domainNames', '');
                    localStorage.setItem('domainNames', JSON.stringify(domainnames));

                    if ((domainnames.length === 0) & (domNamesCnt === 1)) {
                        location.reload();
                        domNamesCnt = 2;
                    }
                });
            }
            //console.log(domainnames.length);
            domCounter++;
        };
    } else {
        // Wenn alle Domains gelöscht wurden, wird ein Hinweis angezeigt:
        // location.reload();
        //console.log(domainnames.length);
        const emptyArray = dom.createEl('Keine Daten vorhanden !', 'div', elements.main, ['container', 'hinweisKeineDaten']);
    }
}

const JSONSuccessLoad = evt => {
    let data;
    let domainnames;

    // Prüfen ob localstorage schon Daten beinhaltet:
    domainnames = JSON.parse(localStorage.getItem('domainNames'));

    // Wenn im localstorage noch keine Daten vorhanden sind, lade die Datei:
    if (!domainnames) {
        if (evt.target.status == 200) {
            data = JSON.parse(evt.target.responseText);
            console.log('testausgabe data als Array' + data.Array);
            domainnames = Array.from(data.websites);
            console.log('Daten aus JSON Datei geladen: ' + domainnames);
            localStorage.setItem('domainNames', JSON.stringify(domainnames));
        } else {
            console.warn(evt.target.statusText);
        }
    } else {
        // Wenn im localstorage Daten vorhanden sind, lade die Daten aus dem localstorage:
        domainnames = JSON.parse(localStorage.getItem('domainNames'));
        console.log('Daten aus localstorage geladen: ' + domainnames);
    }
    renderContent(domainnames);
}

const loadDataFile = () => {
    // Datei auffinden und vorbereiten zum laden der Daten:
    const xhr = new XMLHttpRequest();
    xhr.open('get', './data/checkdomain.json');
    xhr.addEventListener('load', JSONSuccessLoad);
    xhr.send();
}

const DOMMapping = () => {
    // DOM Mapping soweit notwendig:
    elements.main = document.querySelector('main');
}

const setNavigation = () => {
    let dmClickcount = 1;

    const navigation = document.querySelector('nav');
    const btnDarkMode = dom.createEl('Dark Mode', 'div', navigation, ['darkButton']);
    const body = document.querySelector('body');
    const btnDark = document.querySelector(':root');
   
    btnDarkMode.addEventListener('click', () => {
        if (dmClickcount) {
            $(body).addClass('darkMode');
            dmClickcount = 0;
            btnDark.style.setProperty("--darkbtnbackcolor", "white");
            btnDark.style.setProperty("--darkbtncolor", "black");
            /*
               --darkbtnbackcolor: darkgray;
               --darkbtncolor:  white;
            */
        } else {
            $(body).removeClass('darkMode');
            dmClickcount = 1;
            btnDark.style.setProperty("--darkbtnbackcolor", "black");
            btnDark.style.setProperty("--darkbtncolor", "white");

        }
    })
}

const setSideHeader = () => {
    // Seiten Kopf statisch anlegen:    
    const h3header = document.querySelector('header');
    dom.createEl("Dubiose-Webseiten", 'h1', h3header);
}

window.onscroll = function () { scrollFunction() };

const scrollFunction = () => {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const init = () => {
    // Funktionsaufrufe:
    setNavigation();
    setSideHeader();
    DOMMapping();
    loadDataFile();

    // Up-Buttons suchen und variable setzen:
    mybutton = document.querySelector('#myBtn');
}

$(document).ready(init);
