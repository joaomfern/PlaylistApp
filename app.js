const form = document.querySelector('.add');
const playlist = document.querySelector('.playlist');
const listamusicas = document.querySelector('.ListaMusics');
const musicas = document.querySelector('.musics');
const submit = document.querySelector('.submeter');
const mensagem = document.querySelector('.mensagem');

var playlistArray = [];
var musicsArray = [];

//General Code
window.addEventListener('load', e => {

    if (localStorage.getItem(localStorage.getItem('playlists')) != "") {
        const arrayPlaylist = JSON.parse(localStorage.getItem('playlists'));
        let li = ''
        arrayPlaylist.forEach(valor => {
            playlistArray.push(valor);
            buildtabelas(valor, playlist);
            if (!document.querySelector('.ativo')) {
                li = playlist.firstElementChild;
                li.classList.add('ativo')
            }

        })
    }

    if (localStorage.getItem(localStorage.getItem('musica')) != "") {
        const arraymusics = JSON.parse(localStorage.getItem('musica'));

        arraymusics.forEach(valor => {
            musicsArray.push(valor);
            buildtabelas(valor.nomeMusica, listamusicas);

        })
        procuraMusicas()
    }

})

const procuraMusicas = () => {

    var musicasPorPlaylist = [];

    musicsArray.forEach(musica => {
        if ((playlist.querySelector('.ativo').innerText) === musica.playlistName)
        musicasPorPlaylist.push(musica.nomeMusica)
    })


    var musicas = listamusicas.querySelectorAll('li');
    musicas.forEach((li) => {

        li.classList.remove('filtered')
        if (musicasPorPlaylist.includes(li.innerText)) {
            li.classList.remove('filtered')
        } else {
            li.classList.add('filtered')
        }
    })

}

const buildtabelas = (texto, tabela) => {

    var reproduzir = ''
    if (tabela === listamusicas) {
        reproduzir = '<i class="fa fa-play icones"></i>'
    }

    tabela.innerHTML = tabela.innerHTML + `
    <li class="list-group-item ">      
    <span class="pointer">${texto}</span>
    <i class="fas fa-trash-alt delete icones"></i>  
    ${reproduzir}
  
    </li>
    `
}

//Playlists Code

form.addEventListener('submit', e => {
    e.preventDefault();

    buildtabelas(form.add.value, playlist);

    playlistArray.push(form.add.value);
    localStorage.setItem('playlists', JSON.stringify(playlistArray))

    form.add.value = ""

})


playlist.addEventListener('click', e => {
    if (e.target.tagName == 'I') {
        let li = (e.target).parentElement;
        playlistArray = playlistArray.filter(list => list != li.innerText)
        localStorage.setItem('playlists', JSON.stringify(playlistArray))

        musicsArray = musicsArray.filter(list => list.playlistName != li.innerText)
        localStorage.setItem('musica', JSON.stringify(musicsArray))

        playlist.removeChild(li)

    };

    if (e.target.tagName == 'SPAN') {
        let li = (e.target).parentElement;
        if (document.querySelector('.ativo')) {
            document.querySelector('.ativo').classList.remove('ativo')
        }
        li.classList.add('ativo');
        procuraMusicas()

    };
})

//Musics Code

listamusicas.addEventListener('click', e => {
    if (e.target.tagName == 'I' && e.target.classList.contains('delete')) {
        let li = (e.target).parentElement;
        musicsArray = musicsArray.filter(list => list.nomeMusica != li.innerText)
        localStorage.setItem('musica', JSON.stringify(musicsArray))
        listamusicas.removeChild(li)
    } else {
        let li = (e.target).parentElement;
        buttonAnimation(e.target)
        let linkMusica = musicsArray.filter(list => list.nomeMusica === li.innerText)
        window.open(linkMusica[0].linkMusica, "_blank");
    }

})

submit.addEventListener('click', e => {
    e.preventDefault();

    if (musicas.music.value != "") {

        musicsArray.push({
            nomeMusica: musicas.music.value,
            linkMusica: musicas.link.value,
            playlistName: playlist.querySelector('.ativo').innerText
        }
        );


        buildtabelas(musicas.music.value, listamusicas);
        localStorage.setItem('musica', JSON.stringify(musicsArray))
        mensagem.innerText = "Música carregada com sucesso!"

    } else {
        mensagem.innerText = "Escreva uma música"
    }
    musicas.music.value = ""
    musicas.link.value = ""

})

function buttonAnimation(button) {
    button.classList.add("pressed");
}