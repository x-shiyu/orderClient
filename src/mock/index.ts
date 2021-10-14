import { mock } from 'mockjs'

export default [{
    url: '/',
    method: 'get',
    response: ({ query }) => {
        return mock({
            "data": {
                'list|10': [{
                    name: '@cword(5,10)',
                    thumb: '@url',
                    vote: '@float(0,4,1,1)',
                    desc: '@cword(5,10)',
                    id: '@natural',
                    'discount|3-4': [{
                        full: '@integer(30,60)',
                        minus: '@integer(10,30)'
                    }]
                }],
                total: 100
            }
        })
    },
}]
