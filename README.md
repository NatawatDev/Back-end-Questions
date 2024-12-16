## Back-end Questions

1. สมมติว่าระบบปัจจุบันมีไมโครเซอร์วิส 3 ตัว ได้แก่ Customer API, Master Data API และ Transaction Data API และมีฟีเจอร์ใหม่ที่ต้องการดึงข้อมูลจากไมโครเซอร์วิสทั้งสามเพื่อแสดงในเวลาเกือบเรียลไทม์ เทคโนโลยีปัจจุบันที่ใช้งานคือ REST APIs และฐานข้อมูล RDBMS คุณจะออกแบบ API ใหม่สำหรับฟีเจอร์นี้อย่างไร?

    **Answer**: ใช้ Kafka ในการเชื่อมโยงไมโครเซอร์วิสทั้งสาม (Customer API, Master Data API, และ Transaction Data API) ใช้ topic เดียวกัน โดยแต่ละ ไมโครเซอร์วิส จะทำการส่งข้อมูล update เมื่อมีการเปลี่ยนแปลงมาที่ topic นี้ 

    หลังจากนั้น kafka consumer จะทำการส่งข้อมูลใหม่ (Customer, Master Data, และ Transaction) แล้วส่งข้อมูลกลับไปยัง API ใหม่ ที่จะตอบกลับผู้ใช้ในรูปแบบเรียลไทม์

2. สมมติว่าทีมเริ่มวางแผน พัฒนา Project ใหม่ โดย Project Manager ขอให้คุณเสนอแผนในการทดสอบ performance คุณจะแนะนำให้ผู้จัดการโครงการดำเนินการอย่างไร?

    **Answer**: 
    1. สำรวจวัตถุประสงค์หลักของโปรเจ็ค เช่น จำนวน user ที่คาดว่าจะใช้งาน, จำนวน request ที่คิดว่าจะเข้ามา
    2. เลือกประเภทการทดสอบให้เหมาะสม เช่น การทำ Load Testing เพื่อทดสอบระบบเมื่อมีผู้ใช้จำนวนมาก, การทำ Queue เมื่อมีการขอ Request เข้ามาพร้อมๆกัน หรือ การทำ Stress Testing เพื่อทดสอบว่าสามารถรองรับการใช้งานที่มากกว่าปกติได้แค่ไหนก่อนที่จะเกิดปัญหา 
    3. พิจารณาเรื่องความปลอดภัย หรือ การทำ Security Testing เช่นการทำ Pentest เพื่อป้องกันช่องโหว่ที่อาจจะถูกโจมตี หรือ Ratelimit เพื่อจำกัดจำนวน Request เพื่อป้องกันการโจมตีแบบ DDoS

    ทั้งนี้ทั้งนั้นการทดสอบเหล่านี้อยู่ที่ วัตถุประสงค์หลักของโปรเจ็ค
    * การวางแผนว่าในแต่ละขั้นตอนของการพัฒนาระบบ ควรทดสอบในระดับไหน เช่น ระหว่างการพัฒนา (Development) และก่อนขึ้นระบบจริง (Production)
    * กำหนดว่าต้องทำทุกอย่างหรือไม่ โดยขึ้นอยู่กับวัตถุประสงค์หลักของโปรเจ็คและความซับซ้อนของระบบ เช่น บางโปรเจ็คอาจไม่จำเป็นต้องทำทั้ง Load และ Stress Testing ถ้าไม่ได้คาดว่าจะมีผู้ใช้จำนวนมาก
  3. ออกแบบและพัฒนา API สองชุดโดยใช้ NestJS และ Postgres (อยู่ใน Project)

### Entity Relationship Diagram (ERD)
![image](https://res.cloudinary.com/dmd2b4hlk/image/upload/fl_preserve_transparency/v1734338097/multilang-product-erd_zloxi7.jpg?_s=public-apps)

### API Documentation
#### Product API
1. _**Create Product**_

    **Endpoint**: `POST /api/v1/product`

    **Description**: Create a new product with translations.

    **Request Body**:

    ```js
    {
      "sku": String,
      "price": Number,
      "updatedBy": String,
      "translations": [
        {
          "languageId": String,
          "name": String,
          "description": String
        }
      ]
    }
    ```

2. _**Search Product by Name**_

    **Endpoint**: `POST /api/v1/product`

    **Description**: Search for products by their translation name.

    **Query Parameters**:

    | Parameters | Type   | Description               |
    |------------|--------|---------------------------|
    | `name`     | string | The product name to search |

    **Example Request**: `GET /api/v1/product/search?name=Product%20Name`

    **Response Example**:

    ```json
    [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "sku": "PRO00001",
        "price": 100,
        "translations": [
          {
            "name": "Product Name",
            "description": "Product Description"
          }
        ]
      }
    ]
    ```
3. _**Create Language**_

    **Endpoint**: `POST /api/v1/product`

    **Description**: Create a new language with a unique `languageCode` and `languageName`.

    **Request Body**: 
    ```json
    {
      "languageCode": "en",
      "languageName": "English"
    }
    ```
    **Response**:

    ```json
    {
      "id": "uuid",
      "languageCode": "en",
      "languageName": "English"
    }
    ```

4. _**Get All Languages**_ 

    **Endpoint**: `GET /api/v1/language`

    **Description**: Get all languages.

    **Response**:

    ```json
    [
      {
        "id": "uuid-1",
        "languageCode": "en",
        "languageName": "English"
      },
      {
        "id": "uuid-2",
        "languageCode": "th",
        "languageName": "Thai"
      }
    ]
    ```
    

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
_Github Repository เป็นส่วนหนึ่งของ Assessment ในการสมัครเข้าทำงาน ตำแหน่ง Full Stack Developer_

