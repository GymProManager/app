import OnboardingItem01 from '@/app/(screens)/OnBoarding/(onBoardingContent)/onboardingItem01'
import OnboardingItem02 from '@/app/(screens)/OnBoarding/(onBoardingContent)/onboardingItem02'
import OnboardingItem03 from '@/app/(screens)/OnBoarding/(onBoardingContent)/onboardingItem03'
import OnboardingItem04 from '@/app/(screens)/OnBoarding/(onBoardingContent)/onboardingItem04'

export default [
    
    {
        id: '1',
        title: 'Title 1',
        image: require('@/assets/images/onboarding-01.jpeg'),
        content:  <OnboardingItem01 />
    },    
    {
        id: '2',
        title: 'Title 2',
        image: require('@/assets/images/onboarding-02.jpeg'),
        content:  <OnboardingItem02 />
    },    
    {
        id: '3',
        title: 'Title 3',
        image: require('@/assets/images/onboarding-03.jpeg'),
        content:  <OnboardingItem03 />
    }  
]