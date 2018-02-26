import reducer from './reducer';
import {restartGame, makeGuess, generateAuralUpdate} from './actions';

describe('reducer', () => {
    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.auralStatus).toEqual('');
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};

        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    })
});

describe('restartGame', () => {
    it('Should start a new game', () => {
        let state = {
            guesses: [55, 45, 35, 25],
            feedback: 'Hello!',
            correctAnswer: 100
        };

        const correctAnswer = 1;

        state = reducer(state, restartGame(correctAnswer));
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.correctAnswer).toEqual(correctAnswer);
        expect(state.auralStatus).toEqual('');
    })
});

describe('makeGuess', () => {
    it('Should make a guess', () => {
        let state = {
            feedback: '',
            guesses: [],
            correctAnswer: 1
        };

        state = reducer(state, makeGuess(75));
        expect(state.feedback).toEqual("You're Ice Cold...");
        expect(state.guesses).toEqual([75]);

        state = reducer(state, makeGuess(40));
        expect(state.feedback).toEqual("You're Cold...");
        expect(state.guesses).toEqual([75, 40]);

        state = reducer(state, makeGuess(20));
        expect(state.feedback).toEqual("You're Warm.");
        expect(state.guesses).toEqual([75, 40, 20]);

        state = reducer(state, makeGuess(6));
        expect(state.feedback).toEqual("You're Hot!");
        expect(state.guesses).toEqual([75, 40, 20, 6]);

        state = reducer(state, makeGuess(1));
        expect(state.feedback).toEqual("You got it!");
        expect(state.guesses).toEqual([75, 40, 20, 6, 1]);

    })
});

describe('generateAuralUpdate', () => {
    it('Can generate aural updates', () => {
        let state = {
            guesses: [25, 3, 90],
            feedback: "You're Warm.",
            auralStatus: ''
        };

        state = reducer(state, generateAuralUpdate());
        expect(state.auralStatus).toEqual(
            "Here's the status of the game right now: You're Warm. You've made 3 guesses. In order of most- to least-recent, they are: 90, 3, 25"
        )
    })
});
