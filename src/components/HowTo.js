const HowTo = () => {
    return (
        <section className="container responsive-container">
            <h2>How to play</h2>
            <article>
                <h5>Starting a level</h5>
                <p>Choose your level from the Level... dropdown. Good luck!</p>
                <h5>Completing a level</h5>
                <p>In order to complete a level you must push all the boxes onto goal positions, styled differently from regular positions. You are not able to pull boxes so be careful not to get them stuck into corners. You are only allowed to push one box at a time.</p>
                <h5>Controlling the game</h5>
                <p>If playing on a computer with a keyboard, the best way to play is by using the arrow keys on your keyboard. You can also use 'r' to reset the current level and 'u' to undo your last move. If your device does not have a keyboard you can toggle the visual controller by pressing the <i className="fas fa-gamepad"></i> button.</p>
                <h5>Using Undo and Reset</h5>
                <p>The level is harder than it looks? Or maybe you were a few seconds slower than your last score? Reset the current level by pressing the <i className="fas fa-fast-backward"></i> button. For the far too common situation where your last move got you stuck in a corner easily undo it with <i className="fas fa-undo"></i>.</p>
                <h5>Changing the theme</h5>
                <p>Logged in users can change the current theme by pressing the Theme... dropdown and choosing another theme. New themes are unlocked with higher levels so keep playing to unlock them!</p>
            </article>
        </section>
    )
}

export default HowTo;