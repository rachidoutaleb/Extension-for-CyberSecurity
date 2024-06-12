from langchain.document_loaders import UnstructuredPDFLoader, OnlinePDFLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import  Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone
import os
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from pinecone import Pinecone
from pinecone import Pinecone, ServerlessSpec
from langchain.vectorstores import Pinecone as PC
from typing import Any, List, Literal
from langchain_core.load.serializable import Serializable
from langchain_core.pydantic_v1 import Field
from typing import (
    TYPE_CHECKING,
    Any,
    Callable,
    Dict,
    Generator,
    Iterable,
    List,
    Optional,
    Tuple,
    TypeVar,
    Union,
)

class Document(Serializable):

    page_content: str
    
    metadata: dict = Field(default_factory=dict)
    
    type: Literal["Document"] = "Document"

    def __init__(self, page_content: str, **kwargs: Any) -> None:
        super().__init__(page_content=page_content, **kwargs)

    @classmethod
    def is_lc_serializable(cls) -> bool:
        return True

    @classmethod
    def get_lc_namespace(cls) -> List[str]:
        return ["langchain", "schema", "document"]

def similarity_search(
    self,
    query: str,
    k: int = 4,
    filter: dict | None = None,
    namespace: str | None = None,
    **kwargs: Any) -> list[Document] :
        params = {
            "queryVector": embedding,
            "path": self._embedding_key,
            "numCandidates": k * 10,
            "limit": k,
            "index": self._index_name,
        }
        if pre_filter:
            params["filter"] = pre_filter
        query = {"$vectorSearch": params}

        pipeline = [
            query,
            {"$set": {"score": {"$meta": "vectorSearchScore"}}},
        ]
        if post_filter_pipeline is not None:
            pipeline.extend(post_filter_pipeline)
        cursor = self._collection.aggregate(pipeline) 
        docs = []
        for res in cursor:
            text = res.pop(self._text_key)
            score = res.pop("score")
            docs.append((Document(page_content=text, metadata=res), score))
        return docs
    
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', 'sk-***')
PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY', '****')
PINECONE_API_ENV = os.environ.get('PINECONE_API_ENV', 'gcp-starter')
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, model_name='gpt-4')
chain = load_qa_chain(llm, chain_type="stuff")
pc = Pinecone(api_key=PINECONE_API_KEY, environment=PINECONE_API_ENV)
pc.list_indexes()
index_name = "python"
if index_name not in pc.list_indexes().names():
  pc.create_index(
    name=index_name,
    dimension=1536,
    metric='cosine',
    spec=ServerlessSpec(
      cloud="aws",
      region="us-east-1"
    )
  )
index = pc.Index(index_name)
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
docsearch = PC.from_existing_index(index_name=index_name, embedding=embeddings, namespace="Default")

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": ["chrome-extension://*"]}})

@app.route('/')
def serve_popup():
    return send_from_directory('./../browser_extensions/', 'popup.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('./../browser_extensions/', filename)

@app.route('/send-query', methods=['POST'])
def process_query():
    query = request.json['query']
    docs = docsearch.similarity_search(query)
    answer = chain.run(input_documents=docs, question=query)
    print(answer)  
    response = "Réponse : " + answer  
    return jsonify({'answer': response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
