.mode columns
.headers on

drop table if exists song;




create table song(

    artist TEXT NOT NULL,
    title TEXT UNIQUE NOT NULL,
    
    lyric TEXT NOT NULL
);



