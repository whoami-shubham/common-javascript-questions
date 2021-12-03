function debounce(fn,time){
    let timer = null;
    return ()=>{
        clearTimeout(timer);
        timer = setTimeout(fn,time);
    }
}