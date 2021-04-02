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
                <p>If playing on computer, the best way to play is by using the arrow keys on your keyboard. Those are the only controls you will need. If your device does not have a keyboard you can toggle the visual controller by pressing the <i className="fas fa-gamepad"></i> button.</p>
                <h5>Using Undo and Reset</h5>
                <p>The game is harder than it looks? Or maybe you were a few seconds slower than your last score? Reset the current level by pressing the <i className="fas fa-fast-backward"></i> button. For the far too common situation where your last move got you stuck in a corner easily undo it with <i className="fas fa-undo"></i>.</p>
                <h5>Changing the theme</h5>
                <p>You don't like how the board looks? Change the theme by pressing Theme... dropdown and choosing another theme. Even better - get in touch and send me your own crafted theme and I will add it to the game.</p>
            </article>
        </section>
    )
}

export default HowTo;