using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class chapter8 : MonoBehaviour {

	public int GetStepCombos(int numSteps) {
		var combos = new int[numSteps + 1];
		combos [0] = 1;
		for (var stepSize = 1; stepSize <= 3; stepSize++) {
			for (var curNum = stepSize; curNum <= numSteps; curNum++) {
				combos [curNum] += combos [curNum - stepSize];
			}
		}
		return combos [numSteps];
	}

	public void TestGetStepCombos(Button button) {
		var allGood = true;
		var answers = new int[51] {
			1,1,2,3,4,5,7,8,10,12,14,
			16,19,21,24,27,30,33,37,40,44,
			48,52,56,61,65,70,75,80,85,91,
			96,102,108,114,120,127,133,140,147,154,
			161,169,176,184,192,200,208,217,225,234,
		};
		for (var i = 0; i <= 50; i++) {
			var answer = GetStepCombos (i);
			if (answer == answers [i]) {
				Debug.Log (i + " = " + answer);
			} else {
				Debug.LogError (i + " = " + answer + ". EXPECTED: " + answers[i]);
				allGood = false;
			}
		}
		if (allGood) {
			button.GetComponent<Image> ().color = Color.green;
		} else {
			button.GetComponent<Image> ().color = Color.red;
		}
	}
}
