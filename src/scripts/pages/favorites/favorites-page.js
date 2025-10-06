import DatabaseHelper from '../../utils/database-helper';

class FavoritesPage {
  async render() {
    return `
      <section class="content favorites-container">
        <h1 class="content__title">Cerita Favorit Anda</h1>
        <div class="search-bar-container">
          <input type="search" id="search-favorite" placeholder="Cari cerita favorit...">
        </div>
        <div class="favorite-list"></div>
      </section>
    `;
  }

  async afterRender() {
    const favoriteListContainer = document.querySelector('.favorite-list');
    const searchInput = document.getElementById('search-favorite');
    
    const renderStories = (stories) => {
      favoriteListContainer.innerHTML = '';
      if (stories.length === 0) {
        favoriteListContainer.innerHTML = '<p>Anda belum memiliki cerita favorit.</p>';
        return;
      }
      stories.forEach((story) => {
        favoriteListContainer.innerHTML += ``;
      });
    };

    let allFavoriteStories = await DatabaseHelper.getAllStories();
    renderStories(allFavoriteStories);

    searchInput.addEventListener('input', (event) => {
      const query = event.target.value.toLowerCase();
      const filteredStories = allFavoriteStories.filter(
        (story) => story.name.toLowerCase().includes(query) || story.description.toLowerCase().includes(query)
      );
      renderStories(filteredStories);
    });
  }
}

export default FavoritesPage;