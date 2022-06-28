import React, { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from "../../hooks/http.hook";
import { RadioButton } from '../../components/RadioButton/RadioButton';
import "./RewievForm.scss";
export const RewievForm = ({ receiver, sender, complain, setComplain, setRewievs, token }) => {

    const auth = useContext(AuthContext);

    const { loading, request } = useHttp();

    const [text, setText] = useState('');

    const [rating, setRating] = useState(1);

    const textChangeHandler = event => {
        setText(event.target.value);
    }

    const radioChangeHandler = event => {
        setRating(event.target.value);
    }

    const createRewiev = async () => {
        try {
            //console.log(`text: ${text}\nrating: ${rating}\nreceiver: ${receiver}\nsender: ${sender}`)
            await request('/api/rewiev/createrewiev', 'POST', { text, rating, receiver, sender }, { Authorization: `Bearer ${auth.token}` });
            const fetched = await request(`/api/rewiev/getrewievs/${receiver}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setRewievs(fetched.sort((a, b) => a.date > b.date ? -1 : 1));
            setComplain(true);
            setRating(1);
            setText('');
        } catch (e) {

        }
    }




    if (complain === true) {
        //window.location.reload();
        return (<div><h1>Rewiew sended</h1></div>)

    }

    return (
        <div>

            <div class="stars">
                <input type="radio" id="star1" name="rating" value="1" onChange={radioChangeHandler} />
                <input type="radio" id="star2" name="rating" value="2" onChange={radioChangeHandler} />
                <input type="radio" id="star3" name="rating" value="3" onChange={radioChangeHandler} />
                <input type="radio" id="star4" name="rating" value="4" onChange={radioChangeHandler} />
                <input type="radio" id="star5" name="rating" value="5" onChange={radioChangeHandler} />

                <label for="star1" aria-label="Banana">1 star</label><label for="star2">2 stars</label><label for="star3">3 stars</label><label for="star4">4 stars</label><label for="star5">5 stars</label>
            </div>

            <textarea onChange={textChangeHandler} value={text}></textarea>
            <button onClick={createRewiev} disabled={loading}>Complain</button>
        </div>
    );

};