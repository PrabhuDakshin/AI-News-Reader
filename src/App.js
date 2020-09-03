import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import wordsToNumbers from 'words-to-numbers';

const alanKey = '739ff2629ffde04d841c4aacb8f982b92e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {

    const [newsArticles, setNewArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    const classes = useStyles();
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if(command === 'newHeadlines'){
                    setNewArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command === 'highlight')
                {
                    setActiveArticle(prev => prev+1);
                }
                else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
                    const article = articles[parsedNumber -1];
                    if(parsedNumber > 20){
                        alanBtn().playText('Please try that again')
                    }
                    else if(article)
                    {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening.');
                    }
                }
            }

        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer} >
                <img src="https://alan.app/voice/images/previews/preview.jpg"
                    alt="logo"
                    className={classes.alanLogo} />
                 
            </div>
            <NewsCards articles={newsArticles} active={activeArticle} />
        </div>
    )
}

export default App;
