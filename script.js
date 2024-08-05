
//  const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=228ada60288344b79b57f570c03ddda2`;

//  async function fetchNewsAndSave() {
//      try {
//          const response = await fetch(apiUrl);
//          if (!response.ok) {
//              throw new Error('Network response was not ok');
//          }
//          const data = await response.json();

//          localStorage.setItem('newsData', JSON.stringify(data));

//          console.log('News data fetched and saved to local storage:', data);
//      } catch (error) {
//          console.error('There was a problem with the fetch operation:', error);
//      }
//  }

//  fetchNewsAndSave();








// my map and search code goes here


let data = JSON.parse(localStorage.getItem("newsData"));
data = data.articles

// console.log(data)












let mainnewscontainer = document.getElementById('mymapedcontainer');
function mapnewsdata(i) {
    i.map((elem) => {
        let titlename = elem.title;
        let paraname = "Latest news on " + titlename;
        paraname = paraname.replace(/ - .*/, '');
        let contenturl = elem.url;

        const dateObject = new Date(elem.publishedAt);
        const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDateString = dateObject.toLocaleDateString('en-US', formatOptions);
        const publicationDate = `Published on: ${formattedDateString}`;

        let subdiv = document.createElement("div");
        subdiv.classList.add('row');


        let mainmapped = `
            <div class="col-md-12">
                <div class="card">
                    <a href=" ${contenturl}">
                        <div class="card-body">
                            <h5 class="card-title"> ${titlename}</h5>
                            <p class="card-text"> ${paraname}</p>
                        </div>
                        <div class="card-footer">
                             ${publicationDate}
                        </div>
                    </a>
                </div>
            </div>
    `;

    subdiv.innerHTML=mainmapped;

    mainnewscontainer.append(subdiv)



    

//map data structure








    });
}

mapnewsdata(data)


let newdata = []

function filterNewsData(keyword) {
    newdata = [];
    document.getElementById('mymapedcontainer').innerHTML = null;
    
    data.forEach((elem) => {
        // Check if the title contains the keyword (case-insensitive)
        if (elem.title && elem.title.toLowerCase().includes(keyword.toLowerCase())) {
            newdata.push(elem);
        }
    });

    mapnewsdata(newdata)
    
}