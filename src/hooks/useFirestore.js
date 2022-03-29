import { useEffect, useState } from "react"
import { db } from "../firebase/config"

// custom hook
const useFirestore = (collection, condition) => {
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createAt')

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length){

                return;
            }

            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)  // 3 tham số truyền vào với fieldName cần so sánh, dấu toán tử so sánh '==' và value so sánh
        }

        const ubsub = collectionRef.onSnapshot((snapshot) => {
            const document = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocuments(document)
        })

        return ubsub
    }, [collection, condition])

    return documents
} 

export default useFirestore