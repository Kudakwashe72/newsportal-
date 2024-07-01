const card=document.querySelector(".cards");
const category=document.querySelector(".category");
const categorySpan=document.querySelectorAll(".category span");
const news1="https://newsapi.org/v2/everything?domains=wsj.com&apiKey=ebec2e65be0c4cb9acf20b931126a0c5";
const news2="https://newsapi.org/v2/everything?q=tesla&from=2024-06-01&sortBy=publishedAt&apiKey=ebec2e65be0c4cb9acf20b931126a0c5";
const news3="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ebec2e65be0c4cb9acf20b931126a0c5";
const news4="https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ebec2e65be0c4cb9acf20b931126a0c5";
const news5="https://newsapi.org/v2/everything?q=cryptosortBy=publishedAt&apiKey=ebec2e65be0c4cb9acf20b931126a0c5t";

const backupImage="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


async function dataRequest(url){
    try{
  const response=await fetch(url);
  const json=response.json();
  return json;
    }catch(error){
        console.log(error);

    }

}

function urlRequest(url){
    dataRequest(url).then(data=>{
        data.articles.forEach(item => {
            card.innerHTML += ` <div class="card">
            <div class="image">
                <img src="${item.urlToImage ? item.urlToImage:backupImage} alt="Default News Image">
            </div>
            <div class="information">
                <div>
                <p class="title">${item.title}</p>
                <p class="description">${item.description}</p>
                <p class="time">
                    <span>${item.publishedAt.replace("Z","").split("T")[1]}</span>
                    <span>${item.publishedAt.replace("Z","").split("T")[0]}</span>
                </p>
            </div>
            <div  class="other">
          <span class="source">i${item.source.name}</span>
          <a   class="url" href="${item.url}"  target="blank">Read Article<i class="bi bi-arrow-right"></i></a>
            </div>
            </div>
        </div>`;
            
        });
     });
}

category.addEventListener("click",event=>{
if(event.target.tagName==="SPAN"){
    card.innerHTML="";
    urlRequest(event.target.dataset.id);
    categorySpan.forEach(item=>item.classList.remove("active"));
    event.target.classList.add("active");

}
});


urlRequest(news4);


