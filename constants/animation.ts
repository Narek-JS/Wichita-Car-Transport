import { AnimationObject, AnimationOptions } from "@/model/animationModel";

export const FormAnimationOptions: AnimationOptions = {
    duration: 200,
    fill: 'forwards'
};

export const FormAnimations: AnimationObject = {
    fromRight: [
        { opacity: 0, transform: "translateX(100%)" },
        { opacity: 1, transform: "translateX(0%)" }
    ],
    toLeft : [
        { opacity: 1, transform: "translateX(0%)" },
        { opacity: 0, transform: "translateX(-100%)" }
    ]
};