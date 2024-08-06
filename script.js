
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





async function fetchBlogs(search) {
    try {
        const response = await fetch('./blog.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const finaldata = data.twinglydata.post;

        // Filter the data based on the search term
        const filteredData = finaldata.filter(item => 
            item.title.toLowerCase().includes(search.toLowerCase())
        );

        // Limit to 100 items
        const limitedData = filteredData.slice(0, 100);

        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = limitedData.map(item => {
            const textWithoutImages = item.text.replace(/<img[^>]*>/g, ''); // Remove <img> tags
            const truncatedText = textWithoutImages.split(' ').slice(0, 20).join(' ') + '...'; // Limiting to ~20 words
            const truncatedTitle = item.title.split(' ').slice(0, 10).join(' '); // Limiting to ~10 words
            return `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${truncatedTitle}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">by ${item.author}</h6>
                            <p class="card-text">${truncatedText}</p>
                            ${item.url ? `<a href="${item.url}" class="btn btn-primary" target="_blank">Read more</a>` : ''}
                        </div>
                        <div class="card-footer">
                            Published on: ${new Date(item.published_at).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error fetching news data:', error);
    }
}
let mysearchdefault = ""
fetchBlogs(mysearchdefault);



































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















//for youtube
let youtubedata = [
    {title:" Main Aur Mumbai | Aakash Gupta | Stand-up Comedy ", url:"https://www.youtube.com/embed/GxJMuSAYZrE?si=FkKv_n57BR55cKqI"},
    {title:"  Earth se Badi Roti?? Indian TV Serials Roast  ", url:"https://www.youtube.com/embed/YFqE8p7m88s?si=rje16Cfif_tToQrh"},
    {title:"  Adv Vimal | Sasu Sunbai case | Vinayak Mali Comedy ", url:"https://www.youtube.com/embed/cSvKlvAJJeo?si=8Sm5jnS2c47tgaeJ"}
    
]



/* <iframe width="560" height="315" src="https://www.youtube.com/embed/GxJMuSAYZrE?si=FkKv_n57BR55cKqI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */


        // Function to generate and display YouTube video cards
        function displayYouTubeVideos() {
            const cardsContainer = document.getElementById('cards-containery');
            cardsContainer.innerHTML = youtubedata.map(item => {
                return `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <iframe src="${item.url}" title="${item.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Initial display of YouTube videos
        displayYouTubeVideos();