import './account.css';

export function Account() {
    return (
        <>
            <form>
                <img src="/images/Vector5.png" alt="vector 5" className='vector'/>
                <p>Log in</p>
                <input />
                <span>Username</span>
                <input type="password" />
                <span>Password</span>
                <button type="submit">Let's Go!</button>
            </form>
            <div id="formButtons">
                    <button>Sign up</button>
                    <button>Log in</button>
            </div>
        </>
    )
}