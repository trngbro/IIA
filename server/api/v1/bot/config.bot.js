const QA = require("../models/QA");
const vntk = require('vntk');
const tfidf = new vntk.TfIdf();

module.exports = async (value) => {
    try {
        const qadatas = await QA.find({ isActive: true }).exec();

        if (!qadatas || qadatas.length === 0) {
            throw new Error('No active QA data found');
        }

        qadatas.forEach(element => {
            tfidf.addDocument(element.question);
        });

        let bestMeasure = 0;
        let bestDocumentIndex = -1;

        tfidf.tfidfs(value, function (i, measure) {
            if (measure > bestMeasure) {
                bestMeasure = measure;
                bestDocumentIndex = i;
            }
        });

        return {
            bestMeasure,
            document: qadatas[bestDocumentIndex]
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
