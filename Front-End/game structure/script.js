document.querySelectorAll('.game-stats').forEach(game => {
    game.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            game.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    });
});
