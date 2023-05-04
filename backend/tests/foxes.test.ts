const request = require("supertest");
const z = require("zod");
const app = require("../app.js");

const foxSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),
  userName: z.string(),
  userId: z.number(),
  likes: z.number(),
});

describe("/api/foxes GET", () => {
  it("Returns 200", async () => {
    const response = await request(app).get("/api/foxes)");
    expect(response.status).toBe(200);
  });

  it("Returns an array of valid foxes", async () => {
    const response = await request(app).get("api/foxes");
    response.body.forEach((fox) => {
      expect(foxSchema.parse(fox)).not.toThrow();
    });
  });
});

/*
    it('POST, post a new fox', async () => {
        const data = {content: test, userId: 5}
        const response = await request(app).post('/foxes').send(data);
        expect(response.statusCode).toBe(201);
        expect(response.statusCode).not.toBe(400);
        expect(response.body.content).toBe(data.content);
        expect(response.body.userId).toBe(data.userId);
    })

    it('DELETE, delete a fox', async () => {
        const response = await request(app).delete('/foxes/:id')
        const foxId = 5;
        let data = {id: 5, userId: 10}
    })
    */

/*
afterAll(() => {
    db.close();
    fs.rmSync('test.db')
})
*/

// return !(router.pathname == "/login" || router.pathname == "/register")
// return !["/login", "/register"].includes(router.pathname)
