const root = document.getElementById("root");

function Rating(rootElement,ratingSize){
    this.rating = 0;
    this.hoverRating = 0;
   
    this.createRating = (id)=>{
        const span = document.createElement("span");
        span.classList.add("material-icons");
        span.classList.add("rating");
        span.innerHTML = `star`
        if(this.hoverRating>=id){
            span.classList.add("rating_active");
        }
        span.addEventListener('click',()=>{
            this.hoverRating = id;
            this.rating = id;
            this.render();
        });
        span.addEventListener('mouseenter',()=>{
           if(this.hoverRating!==id){
                this.hoverRating = id;
                this.render();
            }
        });
        return span;
    }

    this.render = ()=>{
        console.log("rendered")
        rootElement.innerHTML = "";
        const div = document.createElement("div");
        div.classList.add("rating_container");
        div.addEventListener('mouseleave',()=>{
            this.hoverRating = this.rating;
            this.render();
        });
        for(let rating = 1;rating<=ratingSize;rating++){
            div.appendChild(this.createRating(rating));
        }
        rootElement.appendChild(div);

    }
}

const ratingElement = new Rating(root,5);
ratingElement.render();