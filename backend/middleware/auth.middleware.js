import jwt from "jsonwebtoken";

export const authUser = async (req, res,next) => {
    try {
        // 1. Extract the token from the cookies or the Authorization header
         // Extract the Authorization header (usually in the format "Bearer <token>")
    const authHeader = req.headers.authorization;

    // Get the token either from cookies or from the Authorization header if it starts with "Bearer "
    const token = req.cookies.token || (authHeader && authHeader.toLowerCase().startsWith('bearer ') ? authHeader.split(' ')[1] : null);
        // 2. If no token is found, reject the req
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User' });
        }

         const isBlackListed = await redisClient.get(token);
        if (isBlackListed) { // token is blacklisted
            res.cookie('token', '', { maxAge: 0 });
            return res.status(401).send({ error: 'Unauthorized User' });
        }
        // 3. Verify the JWT token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach the decoded user information to the request object
        req.user = decoded;

        // 5. Call next() to pass control to the next middleware or route handler
        next();
    }
    catch(error) {
        // 6. If any error occurs 
        console.log(error);
        res.status(401).send({ error: 'Unauthorized User' });
    }
}
