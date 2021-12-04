
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            console.log(entry);
          if(entry.isIntersecting){
            const img = entry.target;
            if (img.hasAttribute('data-src')) {
                img.setAttribute('src', img.getAttribute('data-src'));
              }
              observer.unobserve(entry.target);
          }
        });
      })
      // observe on all img
      for(let img of document.getElementsByTagName("img")){
          observer.observe(img);
      }
