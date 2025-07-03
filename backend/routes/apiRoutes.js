import express from 'express';
import campaigns from '../controllers/campaigns.js';
import allCampaigns from '../controllers/allCampaigns.js';
import deleteCampaigns from '../controllers/deleteCampaigns.js';
import getCampaignWithID from '../controllers/getCampaignWithID.js';
import updateCampaign from '../controllers/updateCampaign.js';
import generateWithAi from '../controllers/generateWithAi.js';

const apiRouter=express.Router();
apiRouter.post('/campaigns',campaigns);
apiRouter.get('/campaigns',allCampaigns);
apiRouter.delete('/campaigns/:id',deleteCampaigns);
apiRouter.get('/campaigns/:id',getCampaignWithID);
apiRouter.put('/campaigns/:id',updateCampaign);
apiRouter.post('/genai',generateWithAi);

export default apiRouter;