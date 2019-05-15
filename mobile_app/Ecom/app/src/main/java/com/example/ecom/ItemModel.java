package com.example.ecom;

import java.sql.Time;

public class ItemModel {
    String title;
    String prodPic;
    double price;
    String product_id;
    //Time expire;

    public ItemModel(String title, String prodPic, double price,String product_id) {
        this.title = title;
        this.prodPic = prodPic;
        this.price = price;
        this.product_id = product_id;

    }
    /*
    public String getTitle() {
        return title;
    }
    public String getProdPic() {
        return prodPic;
    }

    public int getPrice() {
        return price;
    }
*/
}


