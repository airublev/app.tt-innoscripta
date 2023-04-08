import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NewsFeedService from '../../../api/newsfeed';
import NewsFeedPage from '../NewsFeedPage';
jest.mock('../../../api/newsfeed', () => ({
    getArticles: jest.fn(),
}));

describe('NewsFeedPage component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        NewsFeedService.getArticles.mockImplementation(() =>
            Promise.resolve({"current_page":1,"data":[{"id":266,"title":"Geordie Rose \u2013 AI Humanoid Robot is the Biggest Business in the World","description":"Geordi Rose is the CEO of Sanctuary AI, which has about $100 million in funding. They have deployed humanoid robots into actual commercial retail stores under a test program. During a week-long pilot test, the store, owned by retail chain Canada Tire Corporat\u2026","url":"https:\/\/www.nextbigfuture.com\/2023\/03\/geordie-rose-ai-humanoid-robot-is-the-biggest-business-in-the-world.html","url_to_image":"https:\/\/nextbigfuture.s3.amazonaws.com\/uploads\/2023\/03\/sanctuaryai.jpeg","published_at":"2023-03-26 17:43:29","author":"Brian Wang","content":"Geordi Rose is the CEO of Sanctuary AI, which has about $100 million in funding. They have deployed humanoid robots into actual commercial retail stores under a test program. During a week-long pilot\u2026 [+3434 chars]","category_id":48,"article_source_id":50,"created_at":"2023-04-04T13:57:08.000000Z","updated_at":"2023-04-04T13:57:08.000000Z","article_source":{"id":50,"identifier_source":"next-big-future","name":"Next Big Future","description":"Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.","url":"https:\/\/www.nextbigfuture.com","language":"en","country":"us","created_at":"2023-04-04T13:57:07.000000Z","updated_at":"2023-04-04T13:57:07.000000Z"},"category":{"id":48,"name":"science","created_at":"2023-04-04T13:57:05.000000Z","updated_at":"2023-04-04T13:57:05.000000Z"}},{"id":267,"title":"AI Inception for Lower Costs and Compressed Models","description":"The Stanford Alpaca AI demonstrated the use of a larger and more expensive AI model to train a smaller and cheaper model. The cheaper model was as good and in come cases better than the more expensive model. The more expensive AI model generated vast amounts \u2026","url":"https:\/\/www.nextbigfuture.com\/2023\/03\/ai-inception-for-lower-costs-and-compressed-models.html","url_to_image":"https:\/\/nextbigfuture.s3.amazonaws.com\/uploads\/2023\/03\/Screen-Shot-2023-03-26-at-9.50.42-AM.jpg","published_at":"2023-03-26 16:49:12","author":"Brian Wang","content":"Brian Wang is a Futurist Thought Leader and a popular Science blogger with 1 million readers per month. His blog Nextbigfuture.com is ranked #1 Science News Blog. It covers many disruptive technology\u2026 [+593 chars]","category_id":48,"article_source_id":50,"created_at":"2023-04-04T13:57:08.000000Z","updated_at":"2023-04-04T13:57:08.000000Z","article_source":{"id":50,"identifier_source":"next-big-future","name":"Next Big Future","description":"Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.","url":"https:\/\/www.nextbigfuture.com","language":"en","country":"us","created_at":"2023-04-04T13:57:07.000000Z","updated_at":"2023-04-04T13:57:07.000000Z"},"category":{"id":48,"name":"science","created_at":"2023-04-04T13:57:05.000000Z","updated_at":"2023-04-04T13:57:05.000000Z"}},{"id":268,"title":"Tesla FSD 11.3.3 Giving More Comfortable Rides With Zero Interventions","description":"There is more videos showing that Tesla FSD 11.3.3 is giving more zero-intervention rides in challenging urban driving conditions. The drivers who are monitoring the rides feel the car is being driven in a way where they feel comfortable and confident with th\u2026","url":"https:\/\/www.nextbigfuture.com\/2023\/03\/tesla-fsd-11-3-3-giving-more-comfortable-rides-with-zero-interventions.html","url_to_image":"https:\/\/nextbigfuture.s3.amazonaws.com\/uploads\/2023\/03\/Screen-Shot-2023-03-26-at-9.29.57-AM-1024x556.jpg","published_at":"2023-03-26 16:38:24","author":"Brian Wang","content":"Brian Wang is a Futurist Thought Leader and a popular Science blogger with 1 million readers per month. His blog Nextbigfuture.com is ranked #1 Science News Blog. It covers many disruptive technology\u2026 [+593 chars]","category_id":48,"article_source_id":50,"created_at":"2023-04-04T13:57:08.000000Z","updated_at":"2023-04-04T13:57:08.000000Z","article_source":{"id":50,"identifier_source":"next-big-future","name":"Next Big Future","description":"Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.","url":"https:\/\/www.nextbigfuture.com","language":"en","country":"us","created_at":"2023-04-04T13:57:07.000000Z","updated_at":"2023-04-04T13:57:07.000000Z"},"category":{"id":48,"name":"science","created_at":"2023-04-04T13:57:05.000000Z","updated_at":"2023-04-04T13:57:05.000000Z"}},{"id":269,"title":"US Rebuilding Nuclear Fuel and Uranium Enrichment Production","description":"Between 1985 to 2015, U.S. uranium enrichment capacity fell to zero from 27.3 million Separative Work Units a year, while Russia\u2019s Tenex became a world leader, increasing production to 26.6 million SWU a year from just 3 million in the mid-eighties. The Depar\u2026","url":"https:\/\/www.nextbigfuture.com\/2023\/03\/us-rebuilding-nuclear-fuel-and-uranium-enrichment-production.html","url_to_image":"https:\/\/nextbigfuture.s3.amazonaws.com\/uploads\/2023\/03\/graphic-triso-x-pebble.jpeg","published_at":"2023-03-25 16:29:54","author":"Brian Wang","content":"Between 1985 to 2015, U.S. uranium enrichment capacity fell to zero from 27.3 million Separative Work Units a year, while Russias Tenex became a world leader, increasing production to 26.6 million SW\u2026 [+4804 chars]","category_id":48,"article_source_id":50,"created_at":"2023-04-04T13:57:08.000000Z","updated_at":"2023-04-04T13:57:08.000000Z","article_source":{"id":50,"identifier_source":"next-big-future","name":"Next Big Future","description":"Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.","url":"https:\/\/www.nextbigfuture.com","language":"en","country":"us","created_at":"2023-04-04T13:57:07.000000Z","updated_at":"2023-04-04T13:57:07.000000Z"},"category":{"id":48,"name":"science","created_at":"2023-04-04T13:57:05.000000Z","updated_at":"2023-04-04T13:57:05.000000Z"}},{"id":270,"title":"UK Funds Lunar Nuclear Micro-Reactor","description":"UK Space Agency announced \u00a32.9 million of new funding for a nuclear micro-reactor by Rolls-Royce. They want nuclear power to support a future Moon base for astronauts. This follows a \u00a3249,000 study funded by the UK Space Agency in 2022. Rolls-Royce plan to ha\u2026","url":"https:\/\/www.nextbigfuture.com\/2023\/03\/uk-funds-lunar-nuclear-micro-reactor.html","url_to_image":"https:\/\/nextbigfuture.s3.amazonaws.com\/uploads\/2023\/03\/Screen-Shot-2023-03-24-at-10.32.39-AM.jpg","published_at":"2023-03-24 17:41:54","author":"Brian Wang","content":"UK Space Agency announced \u00a32.9 million of new funding for a nuclear micro-reactor by Rolls-Royce. They want nuclear power to support a future Moon base for astronauts. This follows a \u00a3249,000 study f\u2026 [+2261 chars]","category_id":48,"article_source_id":50,"created_at":"2023-04-04T13:57:08.000000Z","updated_at":"2023-04-04T13:57:08.000000Z","article_source":{"id":50,"identifier_source":"next-big-future","name":"Next Big Future","description":"Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.","url":"https:\/\/www.nextbigfuture.com","language":"en","country":"us","created_at":"2023-04-04T13:57:07.000000Z","updated_at":"2023-04-04T13:57:07.000000Z"},"category":{"id":48,"name":"science","created_at":"2023-04-04T13:57:05.000000Z","updated_at":"2023-04-04T13:57:05.000000Z"}},{"id":271,"title":"US Space Development Agency Wants to Almost Double Budget to $4.7 Billion in 2024","description":"The US Space Development Agency (SDA) is requesting a $4.7 billion budget for fiscal 2024 which is up from $2.6 billion this year. They want to launch satellites for a data relay, called the Transport Layer, and a missile warning and tracking, called the Trac\u2026","url":"https:\/\/www.nextbigfuture.com\/2023\/03\/us-space-development-agency-wants-to-almost-double-budget-to-4-7-billion-in-2024.html","url_to_image":"https:\/\/nextbigfuture.s3.amazonaws.com\/uploads\/2023\/03\/Screen-Shot-2023-03-24-at-10.14.05-AM.jpg","published_at":"2023-03-24 17:19:51","author":"Brian Wang","content":"The US Space Development Agency (SDA) is requesting a $4.7 billion budget for fiscal 2024 which is up from $2.6 billion this year.\r\nThey want to launch satellites for a data relay, called the Transpo\u2026 [+1811 chars]","category_id":48,"article_source_id":50,"created_at":"2023-04-04T13:57:08.000000Z","updated_at":"2023-04-04T13:57:08.000000Z","article_source":{"id":50,"identifier_source":"next-big-future","name":"Next Big Future","description":"Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.","url":"https:\/\/www.nextbigfuture.com","language":"en","country":"us","created_at":"2023-04-04T13:57:07.000000Z","updated_at":"2023-04-04T13:57:07.000000Z"},"category":{"id":48,"name":"science","created_at":"2023-04-04T13:57:05.000000Z","updated_at":"2023-04-04T13:57:05.000000Z"}},{"id":272,"title":"Narwhal Finance Secures $1M in Seed Funding Led by Animoca Ventures","description":"Denmark, Copenhagen, 24th March, 2023, Chainwire Narwhal Finance Secures $1M in Seed Funding Led by Animoca Ventures Narwhal Finance, the decentralized cross-market perpetual trading platform built on BNB Chain and Arbitrum, announced a $1 million seed round \u2026","url":"https:\/\/www.nextbigfuture.com\/2023\/03\/narwhal-finance-secures-1m-in-seed-funding-led-by-animoca-ventures.html","url_to_image":"https:\/\/nextbigfuture.s3.amazonaws.com\/uploads\/2023\/03\/Narwhal_TwitterFeed-01_1679648429qaPRy3QEbo.jpg","published_at":"2023-03-24 12:36:00","author":"chainwire","content":"Denmark, Copenhagen, 24th March, 2023, Chainwire\r\nNarwhal Finance Secures $1M in Seed Funding Led by Animoca Ventures\r\nNarwhal Finance, the decentralized cross-market perpetual trading platform built\u2026 [+2239 chars]","category_id":48,"article_source_id":50,"created_at":"2023-04-04T13:57:08.000000Z","updated_at":"2023-04-04T13:57:08.000000Z","article_source":{"id":50,"identifier_source":"next-big-future","name":"Next Big Future","description":"Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.","url":"https:\/\/www.nextbigfuture.com","language":"en","country":"us","created_at":"2023-04-04T13:57:07.000000Z","updated_at":"2023-04-04T13:57:07.000000Z"},"category":{"id":48,"name":"science","created_at":"2023-04-04T13:57:05.000000Z","updated_at":"2023-04-04T13:57:05.000000Z"}},{"id":273,"title":"Big Language Models Can Train Small and Cheap Language Models","description":"Large language models can train smaller language models and uplevel them quickly. Stanford researchers trained Alpaca 7B, a model fine-tuned from the LLaMA 7B model on 52K instruction-following demonstrations. they used GPT 3.5 to train it. On our preliminary\u2026","url":"https:\/\/www.nextbigfuture.com\/2023\/03\/big-language-models-can-train-small-and-cheap-language-models.html","url_to_image":"https:\/\/nextbigfuture.s3.amazonaws.com\/uploads\/2018\/03\/c4446a32c195a6064c93b49e5e9f836a.jpg","published_at":"2023-03-23 22:22:02","author":"Brian Wang","content":"Large language models can train smaller language models and uplevel them quickly. Stanford researchers trained Alpaca 7B, a model fine-tuned from the LLaMA 7B model on 52K instruction-following demon\u2026 [+2653 chars]","category_id":48,"article_source_id":50,"created_at":"2023-04-04T13:57:08.000000Z","updated_at":"2023-04-04T13:57:08.000000Z","article_source":{"id":50,"identifier_source":"next-big-future","name":"Next Big Future","description":"Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.","url":"https:\/\/www.nextbigfuture.com","language":"en","country":"us","created_at":"2023-04-04T13:57:07.000000Z","updated_at":"2023-04-04T13:57:07.000000Z"},"category":{"id":48,"name":"science","created_at":"2023-04-04T13:57:05.000000Z","updated_at":"2023-04-04T13:57:05.000000Z"}},{"id":274,"title":"500 Wh\/kg Silicon Anode Amprius Battery for Drones and Electric Passenger Planes","description":"Amprius Technologies\u2019 batteries deliver up to double the energy density over standard lithium-ion batteries. This means the battery cells provide more energy and power with much less weight and volume. Amprius will have a quarterly investor call at 5 pm EST, \u2026","url":"https:\/\/www.nextbigfuture.com\/2023\/03\/500-wh-kg-silicon-anode-amprius-battery-for-drones-and-electric-passenger-planes.html","url_to_image":"https:\/\/nextbigfuture.s3.amazonaws.com\/uploads\/2023\/03\/Screen-Shot-2023-03-23-at-11.25.01-AM-1024x541.jpg","published_at":"2023-03-23 18:32:05","author":"Brian Wang","content":"Amprius Technologies batteries deliver up to double the energy density over standard lithium-ion batteries. This means the battery cells provide more energy and power with much less weight and volume\u2026 [+2932 chars]","category_id":48,"article_source_id":50,"created_at":"2023-04-04T13:57:08.000000Z","updated_at":"2023-04-04T13:57:08.000000Z","article_source":{"id":50,"identifier_source":"next-big-future","name":"Next Big Future","description":"Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.","url":"https:\/\/www.nextbigfuture.com","language":"en","country":"us","created_at":"2023-04-04T13:57:07.000000Z","updated_at":"2023-04-04T13:57:07.000000Z"},"category":{"id":48,"name":"science","created_at":"2023-04-04T13:57:05.000000Z","updated_at":"2023-04-04T13:57:05.000000Z"}},{"id":275,"title":"Gen 2 AI Text to Video","description":"Gen-2: The Next Step Forward for Generative AI. It is a multi-modal AI system that can generate novel videos with text, images, or video clips. Arxiv- Structure and Content-Guided Video Synthesis with Diffusion Models Text-guided generative diffusion models u\u2026","url":"https:\/\/www.nextbigfuture.com\/2023\/03\/gen-2-ai-text-to-video.html","url_to_image":"https:\/\/nextbigfuture.s3.amazonaws.com\/uploads\/2023\/03\/Screen-Shot-2023-03-23-at-10.59.11-AM.jpg","published_at":"2023-03-23 18:00:09","author":"Brian Wang","content":"Brian Wang is a Futurist Thought Leader and a popular Science blogger with 1 million readers per month. His blog Nextbigfuture.com is ranked #1 Science News Blog. It covers many disruptive technology\u2026 [+593 chars]","category_id":48,"article_source_id":50,"created_at":"2023-04-04T13:57:08.000000Z","updated_at":"2023-04-04T13:57:08.000000Z","article_source":{"id":50,"identifier_source":"next-big-future","name":"Next Big Future","description":"Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.","url":"https:\/\/www.nextbigfuture.com","language":"en","country":"us","created_at":"2023-04-04T13:57:07.000000Z","updated_at":"2023-04-04T13:57:07.000000Z"},"category":{"id":48,"name":"science","created_at":"2023-04-04T13:57:05.000000Z","updated_at":"2023-04-04T13:57:05.000000Z"}}],"first_page_url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=1","from":1,"last_page":29,"last_page_url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=29","links":[{"url":null,"label":"&laquo; Previous","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=1","label":"1","active":true},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=2","label":"2","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=3","label":"3","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=4","label":"4","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=5","label":"5","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=6","label":"6","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=7","label":"7","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=8","label":"8","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=9","label":"9","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=10","label":"10","active":false},{"url":null,"label":"...","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=28","label":"28","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=29","label":"29","active":false},{"url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=2","label":"Next &raquo;","active":false}],"next_page_url":"http:\/\/tt-innoscripta.local\/api\/newsfeed?page=2","path":"http:\/\/tt-innoscripta.local\/api\/newsfeed","per_page":10,"prev_page_url":null,"to":10,"total":289}),
        );
    });

    it('renders NewsFeedPage component and fetches articles', async () => {
        render(<NewsFeedPage />);

        expect(screen.getByText('Loading articles...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByTestId('search-input')).toBeInTheDocument();
        });

        expect(NewsFeedService.getArticles).toHaveBeenCalled();
    });

    it('handles pagination', async () => {
        render(<NewsFeedPage />);

        await waitFor(() => {
            expect(screen.getByTestId('search-input')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByLabelText('Go to page 2'));

        await waitFor(() => {
            expect(NewsFeedService.getArticles).toHaveBeenCalledTimes(2);
        });

        expect(NewsFeedService.getArticles).toHaveBeenLastCalledWith({
            search: '',
            page: 2,
        });
    });
});