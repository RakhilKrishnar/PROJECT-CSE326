document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById("gallery");
    const loadMoreBtn = document.getElementById("load-more");
    const searchButton = document.getElementById("search-button");
    const searchQueryInput = document.getElementById("search-query");
    const apiKey = 'qG0GhTazmhbkIb5mBsrvVnYDJJjVhnsUoiB4JCcGTFiYIf2mdo7eP3jF';
    let query = 'nature';
    let page = 1;

    function loadImages(newQuery = false) {
        if (newQuery) {
            page = 1;
            gallery.innerHTML = '';
        }

        const url = `https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${page}`;
        fetch(url, {
            headers: {
                Authorization: apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            data.photos.forEach(photo => {
                const imgContainer = document.createElement("div");
                const img = document.createElement("img");
                const likeBtn = document.createElement("button");
                const link = document.createElement("a");

                img.src = photo.src.medium;
                img.alt = photo.alt || 'Photo';
                img.addEventListener('click', () => {
                    window.open(photo.src.large, '_blank');
                });

                likeBtn.innerHTML = '<i class="fas fa-heart"></i>'; // Fixed string issue
                likeBtn.className = "like-button";
                likeBtn.addEventListener('click', () => alert('Liked!'));

                link.href = photo.url;
                link.textContent = 'View on Pexels';
                link.target = '_blank';
                link.style.display = 'block';
                link.style.marginTop = '10px';
                link.style.textDecoration = 'none';
                link.style.color = 'white';

                imgContainer.appendChild(img);
                imgContainer.appendChild(likeBtn);
                imgContainer.appendChild(link);
                gallery.appendChild(imgContainer);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
        page++;
    }

    loadMoreBtn.addEventListener("click", () => loadImages());

    searchButton.addEventListener("click", () => {
        query = searchQueryInput.value;
        loadImages(true);
    });

    loadImages();
});
