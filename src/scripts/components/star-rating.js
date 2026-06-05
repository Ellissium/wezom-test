import vars from '../vendor/vars';

vars.reviewsButton.addEventListener('click', (e) => {
    initRatings();
});

vars.allReviewsButton.addEventListener('click', (e) => {
    initRatings();
});

const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
    initRatings();
}

function initRatings() {
    const ratings = document.querySelectorAll('.rating');
    
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }

    function initRating(rating) {
        const ratingActive = rating.querySelector('.rating__active');
        const ratingValue = rating.querySelector('.rating__value');

        setRatingActiveWidth(ratingActive, ratingValue.innerHTML);

        if (rating.classList.contains('rating__set')) {
            setRating(rating, ratingActive, ratingValue);
        }
    }

    function setRatingActiveWidth(ratingActive, value) {
        const ratingActiveWidth = value * 8.3;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }

    function setRating(rating, ratingActive, ratingValue) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            
            ratingItem.addEventListener("mouseenter", function (e){
                setRatingActiveWidth(ratingActive, ratingItem.value);
            });
            
            ratingItem.addEventListener("mouseleave", function (e) {
                const fixedUserVote = rating.dataset.userVote;
                if (fixedUserVote) {
                    setRatingActiveWidth(ratingActive, fixedUserVote);
                } else {
                    setRatingActiveWidth(ratingActive, ratingValue.innerHTML);
                }
            });
            
            ratingItem.addEventListener("click", function (e) {
                if (rating.dataset.ajax) {
                    setRatingValue(ratingItem.value, rating, ratingActive, ratingValue);
                } else {
                    const currentRating = parseFloat(ratingValue.innerHTML);
                    const userVote = parseFloat(ratingItem.value);
                    const oldVotes = rating.dataset.votes ? parseInt(rating.dataset.votes) : 1;
                    const newVotes = oldVotes + 1;

                    let newValue = ((currentRating * oldVotes) + userVote) / newVotes;
                    newValue = Math.round(newValue * 10) / 10;

                    ratingValue.innerHTML = newValue;
                    rating.dataset.votes = newVotes;
                    rating.dataset.userVote = userVote;
                    
                    setRatingActiveWidth(ratingActive, userVote);
                }
            });
        }
    }


    async function setRatingValue(value, rating, ratingActive, ratingValue) {
        if (!rating.classList.contains('rating__sending')) {
            rating.classList.add('rating__sending');
            let response = await fetch('rating.json', { method: 'GET' });
            
            if (response.ok) {
                const result = await response.json();
                const newRating = result.newRating;
                ratingValue.innerHTML = newRating;
                setRatingActiveWidth(ratingActive, newRating);
                rating.classList.remove('rating__sending');
            } else {
                alert("Ошибка");
                rating.classList.remove('rating__sending');
            }
        }
    }
}
