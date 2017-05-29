using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class chapter8 : MonoBehaviour {

	// 8.1
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

	// 8.2
	public class Pos {
		public int x;
		public int y;
		public Pos(int x, int y) {
			this.x = x;
			this.y = y;
		}
		public override string ToString ()
		{
			return string.Format ("({0}, {1})", this.x, this.y);
		}
	}

	public List<Pos> GetRoboPath(bool[,] map) {
		var stack = new Stack<Pos>();
		stack.Push (new Pos (0, 0));
		while (stack.Count != 0) {
			Pos nextRobo;
			var robo = stack.Peek ();
			Debug.Log ("Processing " + robo.ToString ());
			nextRobo = TryGoRight (robo, map);
			if (nextRobo == null) {
				nextRobo = TryGoDown (robo, map);
				if (nextRobo == null) {
					if (ReachedEnd (robo, map)) {
						return StackPathToList (stack);
					} else {
						map [robo.y, robo.x] = false;
						stack.Pop ();
						continue;
					}
				}
			}
			stack.Push (nextRobo);
		}
		return new List<Pos> (); // empty list because no path found.
	}

	private bool ReachedEnd(Pos robo, bool[,] map) {
		Debug.Log (robo.x + " == " + (map.GetLength (1) - 1) + " && " + robo.y + " == " + (map.GetLength (0) - 1));
		if (robo.x == (map.GetLength (1) - 1) && robo.y == (map.GetLength(0) - 1)) {
			Debug.LogWarning ("You've arrived");
		} else {
			Debug.LogWarning ("dead end");
		}
		return robo.x == (map.GetLength (1) - 1) && robo.y == (map.GetLength(0) - 1);
	}

	private Pos TryGoRight(Pos robo, bool[,] map) {
		var canGoRight = robo.x < (map.GetLength(1) - 1) && map [robo.y, robo.x + 1];
		if (canGoRight) {
			Debug.LogWarning ("Going right");
		}
		return canGoRight ? new Pos (robo.x + 1, robo.y) : null;
	}

	private Pos TryGoDown(Pos robo, bool[,] map) {
		var canGoDown = robo.y < (map.GetLength(0) - 1) && map [robo.y + 1, robo.x];
		if (canGoDown) {
			Debug.LogWarning ("Going down");
		}
		return canGoDown ? new Pos (robo.x, robo.y + 1) : null;
	}

	private List<Pos> StackPathToList(Stack<Pos> stack) {
		var list = new List<Pos> ();
		while (stack.Count != 0) {
			list.Add (stack.Pop());
		}
		list.Reverse ();
		return list;	
	}

	public void TestGetRoboPath(Button button) {
		var allGood = true;

		bool[,] unsolvable = new bool[4, 4] {
			{ true, true, true, false },
			{ true, false, true, false },
			{ false, true, false, true },
			{ true, true, true, true }
		}; 
		PrintPath(GetRoboPath(unsolvable));

		bool[,] maze = new bool[4, 8] {
			{ true, true, true, false, true, true, true, true },
			{ false, false, true, true, true, true, true, true },
			{ true, true, true, true, false, true, true, false },
			{ true, true, true, true, false, true, true, true }
		}; 
		PrintPath(GetRoboPath (maze));

		bool[,] allDown = new bool[5, 1] { { true }, { true }, { true }, { true }, { true } };
		PrintPath(GetRoboPath (allDown));

		if (allGood) {
			button.GetComponent<Image> ().color = Color.green;
		} else {
			button.GetComponent<Image> ().color = Color.red;
		}
	}

	private void PrintPath(List<Pos> path) {
		var pathString = "Path is: ";
		foreach (var coord in path) {
			pathString += coord.ToString () + " ";
		}
		Debug.LogError (pathString);
	}
}
