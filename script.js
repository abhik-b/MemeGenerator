var after = "";
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}



function fetchMemes() {
  color();

  if (document.getElementById("memes")) {
    document.getElementById("memes").remove();
  }
  var newIndex = [];
  var id = 0;
  var lastIndex=[];
  let parentdiv = document.createElement("div");
  parentdiv.id = "memes";
  fetch(`https://www.reddit.com/r/memes.json?after=${after}`)
    .then((response) => response.json())
    .then((body) => {
      after = body.data.after;
      for (let index = 0; index < body.data.children.length; index++) {
        if (body.data.children[index].data.post_hint === "image") {
          id=index;
          newIndex.push(id);
          console.log(index);
          
          
        }
      }
      // console.log(newIndex);
      shuffle(newIndex);
      // console.log(newIndex);
      return body;
    }).then(body=>{
      newIndex.forEach((elem)=>{
              let div = document.createElement("div");
              let h4 = document.createElement("h4");
              let image = document.createElement("img");
              image.src = body.data.children[elem].data.url_overridden_by_dest;
              h4.textContent = `${elem} ${body.data.children[elem].data.title}`;
              console.log(elem,body.data.children[elem].data.title);
              div.appendChild(h4);
              div.appendChild(image);
              parentdiv.appendChild(div);
            document.body.appendChild(parentdiv);
            })
     
    })
    .catch((e) => {
      console.log(e);
    });
}

