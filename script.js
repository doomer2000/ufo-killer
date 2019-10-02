let killed = 0;
let time = 100;
let ufos_cnt = 30;
let timer;
document.getElementById('start-btn').addEventListener('click',function startBClick()
{
    let game_title = document.getElementById('game-title');
    event.target.style.opacity = 0;
    event.target.style.visibility = 'hidden';
    game_title.style.opacity = 0;
    game_title.style.visibility = 'hidden';
    document.getElementById('game-stats').style.visibility = 'visible';
    gameStart();
});

function gameStart()
{
    let ufo_temp = document.getElementById('ufo-template');
    let play_field = document.getElementById('play-field');
    play_field.addEventListener('click',function ufoClick(){
        let target_ufo = event.target.parentNode;
        let hp_bar = target_ufo.getElementsByClassName('hp-bar')[0];
        const cur_width = hp_bar.offsetWidth;
        hp_bar.style.width = (cur_width - 20) + 'px';
        if(hp_bar.offsetWidth == 0 && hp_bar.style.color != 'crimson')
        {
            target_ufo.removeEventListener('click',arguments.callee);
            newKill();
            hp_bar.style.color = 'crimson';
            target_ufo.getElementsByTagName('img')[0].src='/img/ufoend.gif';
            setTimeout(()=>target_ufo.remove(),444);
        }
    });
    for(let i = 0;i<ufos_cnt;i++)
    {
        let clone = ufo_temp.content.cloneNode(true);
        play_field.appendChild(clone);
        let cur_ufo = play_field.getElementsByClassName('ufo')[i];
        cur_ufo.style.top = getRandomInt(10,document.body.clientHeight-160).toString() + 'px';
        cur_ufo.style.right = getRandomInt(20,document.body.clientWidth-160).toString() + 'px';
        cur_ufo.addEventListener('mouseenter',function ufoMO(){
            cur_ufo.style.top = getRandomInt(10,document.body.clientHeight-180).toString() + 'px';
            cur_ufo.style.right = getRandomInt(20,document.body.clientWidth-180).toString() + 'px';
        });
    }
    timer = setInterval(()=>{
        if(time==0)
        {
            document.getElementById('loose-form').style.visibility = 'visible';
            clearInterval(timer);
        }
        else{
            time--;
            document.getElementById('game-stats-time').innerText = 'Time:' + time + 's';
        }
    },1000);
}

function newKill()
{
    killed++;
    if(killed == ufos_cnt)
    {
        clearInterval(timer);
        document.getElementById('win-form').style.visibility = 'visible';
    }
    document.getElementById('game-stats-killed').innerText = 'Killed:' + killed;
}

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function startBossFight()
{

}