import api from "../api";

export async function getStoresList() {
    try {
        const response = await api.get("/giftCardTypes");
        const stores = [];
        response.data.forEach((type) => {
            type.gift_cards.forEach((giftCard) => {
                stores.push(giftCard);
            });
        });
        return { status: "sucess", data: stores };
    } catch (error) {
        return error.message;
    }
}

export async function buyGiftCard(giftCardId, value) {
    try {
        const response = await api.post("/buyGiftCard", {
            gift_card_id: giftCardId,
            value: value,
        });
        return { status: "sucess", data: response.data.message };
    } catch (error) {
        return error.message;
    }
}
