import React, { useRef, useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
export const PayPal = ({ term, cost, setText, text }) => {

    const { loading, request } = useHttp();

    const auth = useContext(AuthContext);

    const id = auth.accountId;


    const paypal = useRef();

    useEffect(() => {

        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "happybober+ 1 month",
                            amount: {
                                currency_code: "CAD",
                                value: cost
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(term);
                if (term) {
                    await request('/api/account/subscription', 'POST', { id, term }, { Authorization: `Bearer ${auth.token}` });
                    setText('You already have a subscription');
                    console.log(text);
                }

                console.log(order);
            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current);

    }, [])



    return (
        <div><div ref={paypal}></div></div>

    )

}