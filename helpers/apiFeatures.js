class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            username: {
                $regex:this.queryStr.keyword,
                $options: "i",
            }
        } : {};
        this.query.find({...keyword})
        return this
    }

    filter(){
        const qry = {...this.queryStr}

        // Remove field for Catagory 
        const removeFields = ["keyword","page","limit"]

        removeFields.forEach(key => delete qry[key]);

        this.query = this.query.find(qry);
        return this;
    }

    pagination(resultPerPage){
        const currPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currPage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
    
}


module.exports = ApiFeatures;