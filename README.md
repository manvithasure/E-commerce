# ShopEase

ShopEase is a React storefront backed by a Spring Boot API and MongoDB.

## Requirements

- Java 21 or newer
- Node.js 20.19+ or 22.12+
- MongoDB running at `mongodb://localhost:27017`

## Run locally

Start the backend from a PowerShell terminal:

```powershell
cd C:\Users\manvi\Downloads\Project\backend
.\mvnw.cmd spring-boot:run
```

Start the frontend from a second terminal:

```powershell
cd C:\Users\manvi\Downloads\Project\frontend
npm install
npm run dev
```

Open <http://localhost:5173>.

## Demo catalog

To insert the sample products and image URLs into MongoDB, set this environment
variable before starting the backend:

```powershell
$env:SHOPEASE_CATALOG_SEED_DEMO_PRODUCTS = "true"
.\mvnw.cmd spring-boot:run
```

The seeder adds only sample product names that are not already present, so it
can be run again without duplicating its products. The sample images are hosted
by Unsplash and require an internet connection in the browser.

## Checks

```powershell
cd C:\Users\manvi\Downloads\Project\frontend
npm run lint
npm run build

cd C:\Users\manvi\Downloads\Project\backend
.\mvnw.cmd test
```
