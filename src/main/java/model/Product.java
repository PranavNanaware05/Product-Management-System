
package model;

public class Product {

    int pid;

    String pname;

    String productDiscription;

    String productCategory;

    double productPrice;

    double rating;

    int stock;

    String prooductBrand;

    String image;

    public Product() {

    }

    public Product(
            int pid,
            String pname,
            String productDiscription,
            String productCategory,
            double productPrice,
            double rating,
            int stock,
            String prooductBrand,
            String image) {

        this.pid = pid;

        this.pname = pname;

        this.productDiscription =
            productDiscription;

        this.productCategory =
            productCategory;

        this.productPrice =
            productPrice;

        this.rating = rating;

        this.stock = stock;

        this.prooductBrand =
            prooductBrand;

        this.image = image;
    }

    public int getPid() {

        return pid;
    }

    public void setPid(int pid) {

        this.pid = pid;
    }

    public String getPname() {

        return pname;
    }

    public void setPname(String pname) {

        this.pname = pname;
    }

    public String getProductDiscription() {

        return productDiscription;
    }

    public void setProductDiscription(
            String productDiscription) {

        this.productDiscription =
            productDiscription;
    }

    public String getProductCategory() {

        return productCategory;
    }

    public void setProductCategory(
            String productCategory) {

        this.productCategory =
            productCategory;
    }

    public double getProductPrice() {

        return productPrice;
    }

    public void setProductPrice(
            double productPrice) {

        this.productPrice =
            productPrice;
    }

    public double getRating() {

        return rating;
    }

    public void setRating(double rating) {

        this.rating = rating;
    }

    public int getStock() {

        return stock;
    }

    public void setStock(int stock) {

        this.stock = stock;
    }

    public String getProoductBrand() {

        return prooductBrand;
    }

    public void setProoductBrand(
            String prooductBrand) {

        this.prooductBrand =
            prooductBrand;
    }

    public String getImage() {

        return image;
    }

    public void setImage(String image) {

        this.image = image;
    }
}

